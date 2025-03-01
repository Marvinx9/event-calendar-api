/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common';
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DataBaseService {
  private pool: Pool;
  private logger = new Logger('DatabaseService');

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      max: 25,
      min: 3,
      idleTimeoutMillis: 60000,
    });

    this.checkConnection();

    process
      .once('SIGTERM', this.closePoolAndExit)
      .once('SIGINT', this.closePoolAndExit);
  }

  private async checkConnection() {
    try {
      const client = await this.pool.connect();
      client.release();
      this.logger.warn(`Conexão ao PostgreSQL iniciada!`);
    } catch (err) {
      this.logger.error(`Erro ao conectar ao PostgreSQL: ${err.message}`);
    }
  }

  async open(): Promise<PoolClient> {
    try {
      return await this.pool.connect();
    } catch (err) {
      this.logger.error(`open: ${err.stack}`);
      throw new Error(err);
    }
  }

  async commitAndClose(client: PoolClient) {
    try {
      if (!client) {
        this.logger.error('commitAndClose: Conexão não encontrada.');
        return;
      }

      await client.query('COMMIT');
      client.release();
    } catch (err) {
      this.logger.error(`commitAndClose: ${err.stack}`);
      throw new Error(err);
    }
  }

  async rollbackAndClose(client: PoolClient) {
    try {
      if (!client) {
        this.logger.error('rollbackAndClose: Conexão não encontrada.');
        return;
      }

      await client.query('ROLLBACK');
      client.release();
    } catch (err) {
      this.logger.error(`rollbackAndClose: ${err.stack}`);
      throw new Error(err);
    }
  }

  async query<T>(
    sql: string,
    binds: Record<string, any> = {},
    client?: PoolClient | null,
  ): Promise<T[]> {
    let isOpenTransaction = true;

    const isLogging = process.env.DB_LOGGING as string;

    if (!client) {
      client = await this.open();
      isOpenTransaction = false;
    }

    try {
      const result = await client.query(sql, Object.values(binds));

      let rows: T[] = [];

      if (result && result.rows && result.rows.length > 0) {
        rows = result.rows.map((one: T) => {
          const newValues: Record<string, unknown> = {};

          Object.keys(one as object).forEach(
            (key: string) => (newValues[key.toLowerCase()] = one[key]),
          );

          return newValues as T;
        });
      }

      if (!isOpenTransaction) this.commitAndClose(client);
      if (isLogging) this.logger.debug(sql);

      return rows;
    } catch (err) {
      if (isLogging) this.logger.debug(`query: ${sql}`);
      this.logger.error(`query: ${err.stack}`);
      throw new Error(err);
    }
  }

  async queryBindOut<T extends QueryResultRow>(
    sql: string,
    binds: any[] = [],
    client: PoolClient | null = null,
  ): Promise<QueryResult<T>> {
    let isOpenTransaction = true;

    const isLogging = process.env.DB_LOGGING as string;

    try {
      if (!client) {
        client = await this.open();
        isOpenTransaction = false;
      }

      const result: QueryResult<T> = await client.query(sql, binds);

      if (!isOpenTransaction) this.commitAndClose(client);
      if (isLogging) this.logger.debug(sql);

      return result;
    } catch (err) {
      if (isLogging) this.logger.debug(`queryBindOut: ${sql}`);
      this.logger.error(`queryBindOut: ${err.stack}`);
      throw new Error(err);
    }
  }

  async closePoolAndExit() {
    try {
      await this.pool.end();

      this.logger.warn('Conexão com PostgreSQL encerrada.');

      process.exit(0);
    } catch (err) {
      this.logger.error(err.message);
      process.exit(1);
    }
  }
}
