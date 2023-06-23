import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
  async getAllTodos(@GetUser() user: Users, @Query() query) {
    return await this.todosService.getAllTodos({
      id: user.id,
      currentPage: query.page,
      perPage: query.perPage || 2,
    });
  }

  @ApiOperation({ summary: '특정 Todo 가져오기' })
  @Get('/:id')
  async getSpecificTodo(@GetUser() user: Users, @Param('id') id: number) {
    return await this.todosService.getSpecificTodo({
      id,
    });
  }

  @ApiOperation({ summary: 'Todo 생성하기' })
  @Post('create')
  async createTodo(@GetUser() user: Users, @Body() body: CreateTodoDto) {
    return this.todosService.createTodo({
      userId: user.id,
      title: body.title,
      body: body.body,
      status: body.status,
      // Images: body.Images,
    });
  }

  @ApiOperation({ summary: 'Todo 생성하기' })
  @Put('update/:id')
  async updateTodo(
    @GetUser() user: Users,
    @Body() body: CreateTodoDto,
    @Param('id') id: number,
  ) {
    return this.todosService.updateTodo({
      postId: id,
      userId: user.id,
      title: body.title,
      body: body.body,
      status: body.status,
      // Images: body.Images,
    });
  }

  async deleteTodo() {}
}
