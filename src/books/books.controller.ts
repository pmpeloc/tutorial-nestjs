import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';

import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { Book } from './entity/book.entity';

@ApiTags('book')
@Controller('books')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  /**
   *
   * @returns {Book[]} Devuelve una lista de libros
   * @param {Request} request Lista de parámetros para filtrar
   */
  @Get()
  @ApiOperation({ summary: 'Obtener lista de libros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de libros',
    type: Book,
  })
  findAll(@Req() request: Request): Promise<Book[]> {
    return this.booksService.findAll(request);
  }

  /**
   *
   * @returns {Book} Devuelve un libro específico
   * @param {number} bookId  Identificador del libro a buscar
   */
  @Get(':bookId')
  @ApiOperation({ summary: 'Devuelve información sobre un libro específico' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Datos del libro',
    type: Book,
  })
  findOne(@Param('bookId', ParseIntPipe) bookId: number): Promise<Book> {
    return this.booksService.findOne(bookId);
  }

  @Post()
  create(@Body() newBook: BookDto): Promise<Book> {
    return this.booksService.create(newBook);
  }

  @Patch(':bookId')
  update(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() newBook: BookDto,
  ): Promise<Book> {
    return this.booksService.update(bookId, newBook);
  }

  @Delete(':bookId')
  remove(@Param('bookId', ParseIntPipe) bookId: number): Promise<any> {
    return this.booksService.delete(bookId);
  }
}
