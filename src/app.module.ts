import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesModule } from './employees/employees.module';
import { EmployeesService } from './employees/employees.service';

@Module({
  imports: [DatabaseModule, EmployeesModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class AppModule {}
