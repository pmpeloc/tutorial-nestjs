import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';

import { BookDto } from './dto/book.dto';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  books: Book[] = [
    {
      id: 1,
      title: 'Una historia de España',
      genre: 'Historia',
      description:
        'Un relato ameno, personal, a ratos irónico, pero siempre único, de nuestra accidentada historia a través de los siglos. Una obra concebida por el autor para, en palabras suyas, «divertirme, releer y disfrutar; un pretexto para mirar atrás desde los tiempos remotos hasta el presente, reflexionar un poco sobre ello y contarlo por escrito de una manera poco ortodoxa.',
      author: 'Arturo Pérez-Reverte',
      publisher: 'Alfaguara',
      pages: 256,
      image_url:
        'https://images-na.ssl-images-amazon.com/images/I/41%2B-e981m1L._SX311_BO1,204,203,200_.jpg',
    },
    {
      id: 2,
      title: 'Historia de España contada para escépticos',
      genre: 'Historia',
      description:
        'Como escribe el autor, no pretende ser veraz, justa y desapasionada, porque ninguna historia lo es. No está hecha para halagar a reyes y gobernantes, ni pretende halagar a los banqueros, ni a la Conferencia Episcopal, ni al colectivo gay.',
      author: 'Juan Eslava Galán',
      publisher: 'Booket',
      pages: 592,
      image_url:
        'https://images-na.ssl-images-amazon.com/images/I/51IyZ5Mq8YL._SX326_BO1,204,203,200_.jpg',
    },
  ];

  findAll(request: Request): Book[] {
    return this.books;
  }

  findOne(bookId: number): Book {
    const book = this.books.find((book) => book.id === bookId);
    if (!book) {
      throw new NotFoundException(`The book with id ${bookId} not exist.`);
    }
    return book;
  }

  create(newBook: BookDto): Book {
    // const book = new Book();
    // book.id = Math.max(...this.books.map((book) => book.id), 0) + 1;
    // book.title = newBook.title;
    // book.genre = newBook.genre;
    // book.description = newBook.description;
    // book.author = newBook.author;
    // book.publisher = newBook.publisher;
    // book.pages = newBook.pages;
    // book.image_url = newBook.image_url;
    const book = {
      ...newBook,
      //              [1,2]  === 1 2 0 // 2 + 1 = 3
      //              [] === 0 + 1 = 1
      id: Math.max(...this.books.map((book) => book.id), 0) + 1,
    };
    this.books.push(book);
    return book;
  }

  update(bookId: number, newBook: BookDto): any {
    return newBook;
  }

  delete(bookId: number): any {
    return 'Eliminar un libro específico';
  }
}
