import { DataBaseService } from 'src/shared/database/services/database.service';
import { ListAgendamentoOutputDto } from '../dtos/listAgendamentoOutput.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAgendamentosRepository {
  constructor(private readonly dataBaseService: DataBaseService) {}

  async listAgendamentos(): Promise<ListAgendamentoOutputDto[]> {
    const sql = `
      SELECT
        *
      FROM AGENDAMENTOS
    `;

    return await this.dataBaseService.query<ListAgendamentoOutputDto>(sql);
  }
}
