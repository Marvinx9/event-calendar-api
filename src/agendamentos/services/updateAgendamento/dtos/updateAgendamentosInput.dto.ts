import { IsBoolean, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAgendamentosInputDto {
  @ApiProperty({
    description: 'verificador se a agenda foi marcada como completa',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  completo?: boolean;

  @ApiProperty({
    description: 'data e horário de inicio da agenda',
    required: false,
  })
  @IsString()
  @IsOptional()
  inicio?: string;

  @ApiProperty({
    description: 'data e horário do fim da agenda',
    required: false,
  })
  @IsString()
  @IsOptional()
  fim?: string;
}
