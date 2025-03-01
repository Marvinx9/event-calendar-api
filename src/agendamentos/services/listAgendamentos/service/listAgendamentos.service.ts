import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ListAgendamentosRepository } from '../repository/listAgendamentos.repository';

@Injectable()
export class ListAgendamentosService {
  constructor(
    private readonly listAgendamentosRepository: ListAgendamentosRepository,
  ) {}

  async execute() {
    try {
      return await this.listAgendamentosRepository.listAgendamentos();
    } catch (error) {
      throw new InternalServerErrorException(
        'ocorreu um erro ao listar os agendamentos!',
      );
    }
  }
}
