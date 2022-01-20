import { HttpException, HttpStatus } from '@nestjs/common';
export class ExistException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
