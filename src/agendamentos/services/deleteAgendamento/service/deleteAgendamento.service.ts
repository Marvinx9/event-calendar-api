import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DeleteAgendamentoRepository } from '../repository/deleteAgendamento.repository';

@Injectable()
export class DeleteAgendamentoService {
  constructor(
    private readonly deleteAgendamentoRepository: DeleteAgendamentoRepository,
  ) {}

  async execute(id: number) {
    try {
      if (!(await this.deleteAgendamentoRepository.verifyAgendamento(id))) {
        throw new BadRequestException('agendamento não encontrado');
      }
      return await this.deleteAgendamentoRepository.deleteAgendamento(id);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'ocorreu um erro ao deletar o agendamento!',
      );
    }
  }
}
