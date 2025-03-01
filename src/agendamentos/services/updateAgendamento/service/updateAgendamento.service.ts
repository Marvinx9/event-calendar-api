import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateAgendamentoRepository } from '../repository/updateAgendamento.repository';
import { UpdateAgendamentosInputDto } from '../dtos/updateAgendamentosInput.dto';

@Injectable()
export class UpdateAgendamentoService {
  constructor(
    private readonly updateAgendamentoRepository: UpdateAgendamentoRepository,
  ) {}

  async execute(id: number, data: UpdateAgendamentosInputDto) {
    try {
      if (!(await this.updateAgendamentoRepository.verifyAgendamento(id))) {
        throw new BadRequestException('agendamento não encontrado');
      }
      return await this.updateAgendamentoRepository.updateAgendamento(id, data);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'ocorreu um erro ao atualizar o agendamento!',
      );
    }
  }
}
