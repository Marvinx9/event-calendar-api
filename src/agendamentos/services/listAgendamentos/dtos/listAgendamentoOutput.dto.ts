import { IsBoolean, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListAgendamentoOutputDto {
  @ApiProperty({ description: 'descrição do agendamento', example: 42 })
  id: number;

  @ApiProperty({ description: 'descrição do agendamento', example: 'estudar' })
  descricao: string;

  @ApiProperty({
    description: 'data e horário de inicio da agenda',
    example: '2025-02-28T09:00',
  })
  inicio: string;

  @ApiProperty({
    description: 'data e horário do fim da agenda',
    example: '2025-02-28T09:00',
  })
  fim: string;

  @ApiProperty({
    description: 'verificador se a agenda foi marcada como completa',
    example: true,
  })
  completo: boolean;

  @ApiProperty({
    description: 'data de criação do agendamento',
    example: '2025-02-28T00:00',
  })
  data_criacao: string;

  @ApiProperty({
    description: 'data de criação do agendamento',
    example: '2025-02-28T00:00',
  })
  data_atualizacao: string;
}
