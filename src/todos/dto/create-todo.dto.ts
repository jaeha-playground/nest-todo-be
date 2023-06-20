import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Images } from 'src/entities/Images';
import { Todos } from 'src/entities/Todos';

export class CreateTodoDto extends PartialType(Todos) {
  @ApiProperty({ required: false }) // Images를 선택 사항으로 지정
  Images?: Images[];
}
