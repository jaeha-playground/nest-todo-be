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
      .innerJoin('todos.Owner', 'owner', 'ownerId = :id', {
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

  async createTodo({ user, title, body, status }) {
    return this.todosRepository.save({
      // ownerId: user,
      title,
      body,
      status,
      // Images,
    });
  }
}
