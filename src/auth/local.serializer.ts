import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super();
  }

  serializeUser(user: Users, done: CallableFunction) {
    console.log('user!!!=', user);
    done(null, user.id); // user객체가 무거워서 user.id만 뽑아서 session 객체에 저장
  }

  // user.id를 가지고 user 객체를 복원시켜 req.user에 넣어줌
  // 아래가 복원하는 과정
  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.usersRepository
      .findOneOrFail({
        where: { id: +userId },
        select: ['id', 'email', 'nickname'],
        relations: ['Workspaces'], // 사용자가 속한 workspaces를 알아서 가져옴
      })
      .then((user) => {
        console.log('user', user);
        done(null, user); // req.user
      })
      .catch((error) => done(error));
  }
}
