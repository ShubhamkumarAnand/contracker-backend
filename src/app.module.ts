import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [DatabaseModule, EmployeesModule],
  controllers: [EmployeesController],
})
export class AppModule {}
