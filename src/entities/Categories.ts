import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todos } from './Todos';

@Entity({ schema: 'nest-todo', name: 'categories' })
export class Categories {
  @ApiProperty({
    example: 1,
    description: 'category 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'categoryName', length: 30 })
  categoryName: string;

  @ManyToMany(() => Todos, (todos) => todos.categories)
  todos: Todos[];
}
