import { Module } from '@nestjs/common';
import { AgendamentosServicesModule } from './services/agendamentosServices.module';

@Module({
  imports: [AgendamentosServicesModule],
  exports: [AgendamentosServicesModule],
})
export class AgendamentosModule {}
