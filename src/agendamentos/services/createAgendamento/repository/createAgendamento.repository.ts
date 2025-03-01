import { DataBaseService } from 'src/shared/database/services/database.service';
import { CreateAgendamentoInputDto } from '../dtos/createAgendamentoInput.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAgendamentoRepository {
  constructor(private readonly dataBaseService: DataBaseService) {}

  async verifyAgenda(inicio: string, fim: string): Promise<number> {
    const sql = `
      SELECT
        ID
      FROM AGENDAMENTOS
      WHERE INICIO >= TO_TIMESTAMP($1, 'YYYY-MM-DD HH24:MI')
      AND FIM <= TO_TIMESTAMP($2, 'YYYY-MM-DD HH24:MI')
    `;

    const binds = [inicio, fim];

    const result = await this.dataBaseService.query<{ id: number }>(sql, binds);
    return result[0]?.id ?? undefined;
  }

  async createAgendamento(data: CreateAgendamentoInputDto): Promise<void> {
    const sql = `
      INSERT INTO AGENDAMENTOS (
        DESCRICAO,
        INICIO,
        FIM,
        COMPLETO
      ) VALUES (
        $1,
        $2,
        $3,
        $4
      )
    `;

    const binds = [
      data.descricao.toUpperCase(),
      data.inicio,
      data.fim,
      data.completo,
    ];

    await this.dataBaseService.query(sql, binds);
  }
}
