import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async join({ email, nickname, password }) {
    console.log(email, nickname, password);
    if (!email) throw new HttpException('이메일이 없네요', 400);
    if (!nickname) throw new HttpException('닉네임이 없네요', 400);
    if (!password) throw new HttpException('비밀번호가 없네요', 400);

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (user) throw new UnauthorizedException('이미 존재하는 사용자입니다.');

    const hashPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashPassword,
    });

    return 'hello';
  }
}
