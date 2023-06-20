import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categories } from './Categories';
import { Images } from './Images';
import { Users } from './Users';

export enum TodoStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity({ schema: 'nest-todo', name: 'todos' })
export class Todos {
  @ApiProperty({
    example: 1,
    description: 'todo 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 100 })
  title: string;

  @Column('varchar', { name: 'body' })
  body: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    name: 'status',
  })
  status: TodoStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Users, (users) => users.todos)
  @JoinColumn([{ name: 'ownerId', referencedColumnName: 'id' }])
  owner: Users;

  @OneToMany(() => Images, (images) => images.todo)
  images: Images[];

  @ManyToMany(() => Categories, (categories) => categories.todos)
  @JoinTable({
    name: 'todoCategories',
    joinColumn: {
      name: 'TodoId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'CategoryId',
      referencedColumnName: 'id',
    },
  })
  categories: Categories[];
}
