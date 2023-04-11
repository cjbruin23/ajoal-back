import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto): string {
    return 'This action adds a new user';
  }

  findAll(): Promise<Users[]> {
    const findAll = this.usersRepository.find();
    console.log('findAll', findAll);
    return findAll;
  }

  findOne(id: number): string {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto): string {
    return `This action updates a #${id} user`;
  }

  remove(id: number): string {
    return `This action removes a #${id} user`;
  }
}
