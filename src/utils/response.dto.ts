import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T> {
  constructor(
    public message: string,
    public statusCode: number = HttpStatus.OK,
    public data: T,
  ) {}
}
