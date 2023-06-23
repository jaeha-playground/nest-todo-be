import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from 'src/entities/Todos';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
    private dataSource: DataSource,
  ) {}

  async getAllTodos({ id, perPage, currentPage }): Promise<Todos[]> {
    console.log('user.id>>>', id);

    const todos = await this.todosRepository
      .createQueryBuilder('todos')
      .innerJoin('todos.owner', 'owner', 'owner.id= :id', {
        id,
      })
      .leftJoinAndSelect('todos.images', 'images')
      .orderBy('todos.updatedAt', 'DESC')
      .skip(currentPage * perPage)
      .take(perPage) // limit
      .getMany();
    console.log('todos>>', todos);

    return todos;
  }

  async getSpecificTodo({ id }) {
    const todo = await this.todosRepository
      .createQueryBuilder('todos')
      .leftJoinAndSelect('todos.images', 'images')
      .where('todos.id = :id', { id })
      .getOne();

    console.log('todo>>', todo);

    return todo;
  }

  async createTodo({ userId, title, body, status }) {
    const todos = new Todos();
    todos.title = title;
    todos.body = body;
    todos.status = status;
    todos.owner = userId;
    return await this.todosRepository.save(todos);
    // return this.todosRepository.save({

    //   title,
    //   body,
    //   status,
    //   // Images,
    //   ownerId: userId,
    // });
  }
}
