import { IsString, IsUUID, NotContains } from 'class-validator';

export class CreateTaskDto {
  title: string;

  @IsString({ each: true })
  @NotContains(',', { each: true })
  tag?: string | string[];

  @IsUUID()
  parent?: string;
}
