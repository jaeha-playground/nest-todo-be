import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '내 정보 가져오기' })
  @Get()
  getProfile(@User() user: Users) {
    return user || false;
  }

  @Post('join')
  async join(@Body() body: JoinRequestDto) {
    await this.usersService.join({
      // body.email, body.nickname, body.password
      email: body.email,
      nickname: body.nickname,
      password: body.password,
    });
  }
}
