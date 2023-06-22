import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { GetUser } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { Users } from 'src/entities/Users';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

@ApiTags('TODOS')
@ApiCookieAuth('connect.sid')
@UseGuards(LoggedInGuard)
@Controller('api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOperation({ summary: '내 Todo 가져오기' })
  @Get('all')
  async getAllTodos(@Body() body, @Query() query) {
    console.log('body>>>', body);
    console.log('query>>>', query.perPage, query.page);

    return await this.todosService.getAllTodos({
      id: body.id,
      currentPage: query.page,
      perPage: (query.perPage = 10),
    });
  }

  @ApiOperation({ summary: 'Todo 생성하기' })
  @Post('create')
  async createTodo(@GetUser() user: Users, @Body() body: CreateTodoDto) {
    console.log('user>>>', user);

    return this.todosService.createTodo({
      userId: user.id,
      title: body.title,
      body: body.body,
      status: body.status,
      // Images: body.Images,
    });
  }

  async updateTodo() {}

  async deleteTodo() {}
}
