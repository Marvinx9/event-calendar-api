import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/shared/database/services/database.service';
import { UpdateAgendamentosInputDto } from '../dtos/updateAgendamentosInput.dto';

@Injectable()
export class UpdateAgendamentoRepository {
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

  async updateAgendamento(
    id: number,
    data: UpdateAgendamentosInputDto,
  ): Promise<void> {
    const sql = `
      UPDATE AGENDAMENTOS
        SET
          ${data.completo === false || data.completo === true ? `COMPLETO = ${data.completo},` : ''}
          ${data.inicio ? `INICIO = TO_TIMESTAMP('${data.inicio}', 'YYYY-MM-DD"T"HH24:MI'),` : ''}
          ${data.fim ? `FIM = TO_TIMESTAMP('${data.fim}', 'YYYY-MM-DD"T"HH24:MI'),` : ''}
          DATA_ATUALIZACAO = CURRENT_TIMESTAMP
      WHERE ID = $1
    `;

    const binds = {
      id,
    };

    await this.dataBaseService.query(sql, binds);
  }
}
