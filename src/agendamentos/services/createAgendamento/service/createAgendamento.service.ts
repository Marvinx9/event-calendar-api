import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAgendamentoInputDto } from '../dtos/createAgendamentoInput.dto';
import { CreateAgendamentoRepository } from '../repository/createAgendamento.repository';

@Injectable()
export class CreateAgendamentoService {
  constructor(
    private readonly createAgendamentoRepository: CreateAgendamentoRepository,
  ) {}

  async execute(data: CreateAgendamentoInputDto) {
    try {
      data.inicio = data.inicio.split('T').join(' ');
      data.fim = data.fim.split('T').join(' ');

      if (
        await this.createAgendamentoRepository.verifyAgenda(
          data.inicio,
          data.fim,
        )
      ) {
        throw new BadRequestException('horário indisponível');
      }
      return await this.createAgendamentoRepository.createAgendamento(data);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'ocorreu um erro ao salvar o agendamento!',
      );
    }
  }
}
