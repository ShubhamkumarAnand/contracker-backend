import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN' | 'MANAGER') {
    if (role) {
      const roleArray = await this.databaseService.employee.findMany({
        where: {
          role: role,
        },
      });
      if (!roleArray.length) throw new NotFoundException('Role Not Found');
      return roleArray;
    }
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const employee = await this.databaseService.employee.findFirst({
      where: {
        id: id,
      },
    });
    if (!employee) throw new NotFoundException('Employee Not Found');
    return employee;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    const employee = await this.findOne(id);
    if (!employee) throw new NotFoundException('Invalid Credentials');
    this.databaseService.employee.update({
      where: {
        id: id,
      },
      data: updateEmployeeDto,
    });
    return { id, ...updateEmployeeDto };
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    if (!employee) throw new NotFoundException('Employee Not Found');
    await this.databaseService.employee.delete({
      where: {
        id: id,
      },
    });
    return employee;
  }
}
