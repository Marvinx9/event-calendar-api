import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgendamentosModule } from './agendamentos/agendamentos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AgendamentosModule,
  ],
})
export class AppModule {}
