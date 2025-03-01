import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/database/database.module';
import { CreateAgendamentoService } from './createAgendamento/service/createAgendamento.service';
import { CreateAgendamentoRepository } from './createAgendamento/repository/createAgendamento.repository';
import { AgendamentoController } from '../controllers/agendamento.controller';
import { ListAgendamentosService } from './listAgendamentos/service/listAgendamentos.service';
import { ListAgendamentosRepository } from './listAgendamentos/repository/listAgendamentos.repository';
import { DeleteAgendamentoService } from './deleteAgendamento/service/deleteAgendamento.service';
import { DeleteAgendamentoRepository } from './deleteAgendamento/repository/deleteAgendamento.repository';
import { UpdateAgendamentoService } from './updateAgendamento/service/updateAgendamento.service';
import { UpdateAgendamentoRepository } from './updateAgendamento/repository/updateAgendamento.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    ListAgendamentosService,
    ListAgendamentosRepository,
    CreateAgendamentoService,
    CreateAgendamentoRepository,
    UpdateAgendamentoService,
    UpdateAgendamentoRepository,
    DeleteAgendamentoService,
    DeleteAgendamentoRepository,
  ],
  controllers: [AgendamentoController],
})
export class AgendamentosServicesModule {}
