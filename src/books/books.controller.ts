import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':bookId')
  findOne(@Param('bookId', ParseIntPipe) bookId: number) {
    console.log(bookId);
    return this.booksService.findOne(bookId);
  }
}
