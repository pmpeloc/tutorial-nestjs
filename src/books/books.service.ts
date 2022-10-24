import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { BookDto } from './dto/book.dto';
import { Book } from './entity/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async findAll(request: Request): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async findOne(bookId: number): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new NotFoundException(`The book with id ${bookId} not exist.`);
    }
    return book;
  }

  async create(newBook: BookDto): Promise<Book> {
    return await this.booksRepository.save(newBook);
  }

  async update(bookId: number, newBook: BookDto): Promise<Book> {
    const book = await this.findOne(bookId);
    const bookUpdated = { ...book, ...newBook };
    return await this.booksRepository.save(bookUpdated);
  }

  async delete(bookId: number): Promise<any> {
    const book = await this.findOne(bookId);
    await this.booksRepository.delete(book);
  }
}
