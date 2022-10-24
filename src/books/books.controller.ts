import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Req() request: Request) {
    return this.booksService.findAll(request);
  }

  @Get(':bookId')
  findOne(@Param('bookId', ParseIntPipe) bookId: number) {
    return this.booksService.findOne(bookId);
  }

  @Post()
  create(@Body() newBook: BookDto) {
    return this.booksService.create(newBook);
  }

  @Patch(':bookId')
  update(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() newBook: BookDto,
  ) {
    return this.booksService.update(bookId, newBook);
  }

  @Delete(':bookId')
  remove(@Param('bookId', ParseIntPipe) bookId: number) {
    return this.booksService.delete(bookId);
  }
}
