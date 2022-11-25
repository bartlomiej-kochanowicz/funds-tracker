import { Injectable } from '@nestjs/common';
import { CreateAbcdInput } from './dto/create-abcd.input';
import { UpdateAbcdInput } from './dto/update-abcd.input';

@Injectable()
export class AbcdService {
  create(createAbcdInput: CreateAbcdInput) {
    return 'This action adds a new abcd';
  }

  findAll() {
    return `This action returns all abcd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} abcd`;
  }

  update(id: number, updateAbcdInput: UpdateAbcdInput) {
    return `This action updates a #${id} abcd`;
  }

  remove(id: number) {
    return `This action removes a #${id} abcd`;
  }
}
