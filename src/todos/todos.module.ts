import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Users } from 'src/entities/Users';
import { Todos } from 'src/entities/Todos';
import { Categories } from 'src/entities/Categories';
import { Images } from 'src/entities/Images';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Todos, Categories, Images])],
  providers: [TodosService],
  controllers: [TodosController],
  exports: [TodosService],
})
export class TodosModule {}
