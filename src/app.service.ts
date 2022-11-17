import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'You are conected to Take-Me-Home DDD API!';
  }
}
