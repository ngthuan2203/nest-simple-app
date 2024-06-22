import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userModel.create({
      id: v4(),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      age: createUserDto.age,
      nationality: createUserDto.nationality
    });
  }

  getAll() {
    return this.userModel.findAll();
  }
}
