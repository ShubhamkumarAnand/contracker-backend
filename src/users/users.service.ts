import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'TEACHER',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'STUDENT',
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Ethan Hunt',
      email: 'ethan.hunt@example.com',
      role: 'TEACHER',
    },
    {
      id: 6,
      name: 'Fiona Gallagher',
      email: 'fiona.gallagher@example.com',
      role: 'STUDENT',
    },
    {
      id: 7,
      name: 'George Clooney',
      email: 'george.clooney@example.com',
      role: 'ADMIN',
    },
    {
      id: 8,
      name: 'Hannah Montana',
      email: 'hannah.montana@example.com',
      role: 'TEACHER',
    },
    {
      id: 9,
      name: 'Isaac Newton',
      email: 'isaac.newton@example.com',
      role: 'STUDENT',
    },
    {
      id: 10,
      name: 'Jessica Jones',
      email: 'jessica.jones@example.com',
      role: 'STUDENT',
    },
  ];

  findAll(role?: 'ADMIN' | 'STUDENT' | 'TEACHER') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  create(createUserDto: CreateUserDTO) {
    const userByHeighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHeighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDto: UpdateUserDTO) {
    const user = this.findOne(id);
    if (!user) throw new NotFoundException('User Not Found');
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    if (!removedUser) throw new NotFoundException('User Not Found');
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
