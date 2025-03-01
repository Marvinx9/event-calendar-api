import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/shared/database/services/database.service';

@Injectable()
export class DeleteAgendamentoRepository {
  constructor(private readonly dataBaseService: DataBaseService) {}

  async verifyAgendamento(id: number): Promise<number> {
    const sql = `
      SELECT
        ID
      FROM AGENDAMENTOS
      WHERE ID = $1
    `;

    const binds = {
      id,
    };
    const result = await this.dataBaseService.query<{ id: number }>(sql, binds);
    return result[0]?.id ?? undefined;
  }

  async deleteAgendamento(id: number): Promise<void> {
    const sql = `
      DELETE FROM AGENDAMENTOS WHERE ID = $1
    `;

    const binds = {
      id,
    };
    await this.dataBaseService.query(sql, binds);
  }
}
