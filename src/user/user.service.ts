import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private userSchema: Model<Users>) {}

  async create(createUserDto: CreateUserDto) {
    const encryptedPass = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.BCRYPT_SALT),
    );
    createUserDto.password = encryptedPass;
    return await this.userSchema.create(createUserDto);
  }

  async findAll() {
    return await this.userSchema.find();
  }

  async findOne(id: string) {
    const user = await this.userSchema.findById(id);
    if (user) return user;
    else throw new NotFoundException('user not found.');
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userSchema.findById(_id);
    if (user)
      return await this.userSchema.findByIdAndUpdate(_id, updateUserDto);
    else throw new NotFoundException('user not found.');
  }

  async remove(_id: string) {
    const users = await this.userSchema.findByIdAndDelete(_id);
    if (users) return users;
    else throw new NotFoundException('user not found.');
  }

  async findByUserName(user_name: string): Promise<Users> {
    const users = await this.userSchema.findOne({ user_name });
    if (users) return users;
    else throw new NotFoundException('user not found.');
  }
}
