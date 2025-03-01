import { IsBoolean, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgendamentoInputDto {
  @ApiProperty({ description: 'descrição do agendamento', example: 'estudar' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    description: 'data e horário de inicio da agenda',
    example: '2025-02-28T09:00',
  })
  @IsString()
  @IsNotEmpty()
  inicio: string;

  @ApiProperty({
    description: 'data e horário do fim da agenda',
    example: '2025-02-28T09:00',
  })
  @IsString()
  @IsNotEmpty()
  fim: string;

  @ApiProperty({
    description: 'verificador se a agenda foi marcada como completa',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  completo: boolean;
}
