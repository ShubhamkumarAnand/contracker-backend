import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'STUDENT', 'TEACHER'], {
    message: 'Valid Role Required',
  })
  role: 'ADMIN' | 'STUDENT' | 'TEACHER';
}
