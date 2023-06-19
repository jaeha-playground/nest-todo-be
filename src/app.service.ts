import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  // getHello(): string {
  //   return process.env.SECRET;
  // }

  getHello(): string {
    // process.env.PORT
    return this.configService.get('SECRET');
  }
}
