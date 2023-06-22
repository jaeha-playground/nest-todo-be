import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Todos, TodoStatus } from 'src/entities/Todos';

@Injectable()
export class UsersService {
  // service 안에서는 repository
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
    private dataSource: DataSource,
  ) {}

  async join({ email, nickname, password }) {
    console.log(email, nickname, password);
    if (!email) throw new HttpException('이메일이 없네요', 400);
    if (!nickname) throw new HttpException('닉네임이 없네요', 400);
    if (!password) throw new HttpException('비밀번호가 없네요', 400);

    // transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (user) throw new UnauthorizedException('이미 존재하는 사용자입니다.');

    const hashPassword = await bcrypt.hash(password, 12);

    try {
      const returned = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashPassword,
      });
      console.log('returned.id>>>', returned);

      await queryRunner.manager.getRepository(Todos).save({
        title: `${returned.nickname}님 환영합니다.`,
        body: `${returned.nickname}님 Todo 예시.`,
        status: TodoStatus.TODO,
        Owner: returned,
      });

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
