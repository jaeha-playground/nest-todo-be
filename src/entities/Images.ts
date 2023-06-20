import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todos } from './Todos';
import { Users } from './Users';

@Entity({ schema: 'nest-todo', name: 'images' })
export class Images {
  @ApiProperty({
    example: 1,
    description: 'image 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Todos, (todos) => todos.Images)
  @JoinColumn([{ name: 'todoImageUrl', referencedColumnName: 'id' }])
  todoImageUrl: Todos;

  @OneToOne(() => Users, (users) => users.Images)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  // @JoinColumn()
  user: string;
}
