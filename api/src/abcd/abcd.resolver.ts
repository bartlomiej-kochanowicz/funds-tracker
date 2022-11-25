import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AbcdService } from './abcd.service';
import { Abcd } from './entities/abcd.entity';
import { CreateAbcdInput } from './dto/create-abcd.input';
import { UpdateAbcdInput } from './dto/update-abcd.input';

@Resolver(() => Abcd)
export class AbcdResolver {
  constructor(private readonly abcdService: AbcdService) {}

  @Mutation(() => Abcd)
  createAbcd(@Args('createAbcdInput') createAbcdInput: CreateAbcdInput) {
    return this.abcdService.create(createAbcdInput);
  }

  @Query(() => [Abcd], { name: 'abcd' })
  findAll() {
    return this.abcdService.findAll();
  }

  @Query(() => Abcd, { name: 'abcd' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.abcdService.findOne(id);
  }

  @Mutation(() => Abcd)
  updateAbcd(@Args('updateAbcdInput') updateAbcdInput: UpdateAbcdInput) {
    return this.abcdService.update(updateAbcdInput.id, updateAbcdInput);
  }

  @Mutation(() => Abcd)
  removeAbcd(@Args('id', { type: () => Int }) id: number) {
    return this.abcdService.remove(id);
  }
}
