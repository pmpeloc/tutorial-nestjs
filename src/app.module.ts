import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    BooksModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TUTORIAL_HOST,
      port: +process.env.TUTORIAL_PORT,
      username: process.env.TUTORIAL_USER,
      password: process.env.TUTORIAL_PASSWORD,
      database: process.env.TUTORIAL_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
