import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './config/typeorm.config';
import { Users } from './entities/Users';
import { LoggerMiddleware } from './middlewares/logger.middlewares';
import { UsersModule } from './users/users.module';

const getEnv = async () => {
  // const response = await axios.get('/비밀키요청')
  // return await response.data

  return {
    DB_PASSWORD: 'password',
    DB_NAME: 'mysql',
  };
};

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true, load: [getEnv] }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 모든 경로에 middleware 사용
  }
}
