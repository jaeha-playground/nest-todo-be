import { Body, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { TodosService } from './todos.service';

@ApiTags('TODOS')
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
      perPage: query.perPage,
    });
  }

  async createTodo() {}

  async updateTodo() {}

  async deleteTodo() {}
}
