import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAgendamentoService } from '../services/createAgendamento/service/createAgendamento.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAgendamentoInputDto } from '../services/createAgendamento/dtos/createAgendamentoInput.dto';
import { ListAgendamentosService } from '../services/listAgendamentos/service/listAgendamentos.service';
import { DeleteAgendamentoService } from '../services/deleteAgendamento/service/deleteAgendamento.service';
import { UpdateAgendamentoService } from '../services/updateAgendamento/service/updateAgendamento.service';
import { UpdateAgendamentosInputDto } from '../services/updateAgendamento/dtos/updateAgendamentosInput.dto';

@ApiTags('Agendamentos')
@Controller('agendamentos')
export class AgendamentoController {
  constructor(
    private readonly listAgendamentosService: ListAgendamentosService,
    private readonly createAgendamentoService: CreateAgendamentoService,
    private readonly updateAgendamentoService: UpdateAgendamentoService,
    private readonly deleteAgendamentoService: DeleteAgendamentoService,
  ) {}

  @Get()
  @ApiOkResponse({ description: 'agendamentos listados com sucesso!' })
  @ApiOperation({ summary: 'retorna uma lista de agendamentos' })
  @ApiInternalServerErrorResponse({
    description: 'ocorreu um erro ao listar os agendamentos!',
  })
  async listAgendamentos() {
    return await this.listAgendamentosService.execute();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'agendamento criado com sucesso!',
    type: Number,
    example: 5,
  })
  @ApiOperation({
    summary:
      'recebe um agendamento e cria no banco de dados retornando o id da criação',
  })
  @ApiBadRequestResponse({ description: 'horário indisponível' })
  @ApiInternalServerErrorResponse({
    description: 'ocorreu um erro ao salvar o agendamento!',
  })
  async createAgendamento(
    @Body() data: CreateAgendamentoInputDto,
  ): Promise<number> {
    return await this.createAgendamentoService.execute(data);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: 'agendamento atualizado com sucesso!',
  })
  @ApiOperation({
    summary: 'recebe parâmetros e atualiza no banco de dados',
  })
  @ApiBadRequestResponse({ description: 'agendamento não encontrado' })
  @ApiInternalServerErrorResponse({
    description: 'ocorreu um erro ao atualizar o agendamento!',
  })
  async updateAgendamento(
    @Param('id') id: number,
    @Body() data: UpdateAgendamentosInputDto,
  ) {
    return await this.updateAgendamentoService.execute(id, data);
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'agendamento deletado com sucesso!' })
  @ApiOperation({
    summary: 'recebe o id do agendamento e exclui no banco de dados',
  })
  @ApiBadRequestResponse({ description: 'agendamento não encontrado' })
  @ApiInternalServerErrorResponse({
    description: 'ocorreu um erro ao deletar o agendamento!',
  })
  async deleteAgendamento(@Param('id') id: number) {
    return await this.deleteAgendamentoService.execute(id);
  }
}
