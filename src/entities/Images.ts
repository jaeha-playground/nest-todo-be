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

  @Column({ nullable: true })
  src: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Todos, (todos) => todos.images)
  @JoinColumn([{ name: 'todoId', referencedColumnName: 'id' }])
  todo: Todos;

  @OneToOne(() => Users, (users) => users.images)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: Users;
}
