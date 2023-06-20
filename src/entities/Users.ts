import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Images } from './Images';
import { Todos } from './Todos';

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'nest-todo', name: 'users' })
export class Users {
  // PK
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  // 이메일
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'test@test.com',
    description: '이메일',
    required: true,
  })
  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  // 닉네임
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'testnickname',
    description: '닉네임',
    required: true,
  })
  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  // 비밀번호
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'asdf1234',
    description: '비밀번호',
    required: true,
  })
  @Column('varchar', {
    name: 'password',
    unique: true,
    length: 100,
    select: false,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Images, (images) => images.user)
  Images: Images;

  @OneToMany(() => Todos, (todos) => todos.Owner)
  Todos: Todos[];
}
