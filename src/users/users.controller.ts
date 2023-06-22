import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { GetUser } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { Users } from 'src/entities/Users';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 내 정보(로그인한 유저) 가져오기
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '내 정보 가져오기' })
  @Get()
  getProfile(@GetUser() user: Users) {
    return user || false;
  }

  // 회원가입
  @ApiOperation({ summary: '회원가입' })
  @UseGuards(NotLoggedInGuard)
  @Post('join')
  async join(@Body() body: JoinRequestDto) {
    await this.usersService.join({
      email: body.email,
      nickname: body.nickname,
      password: body.password,
    });
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@GetUser() user) {
    return user;
  }
}
