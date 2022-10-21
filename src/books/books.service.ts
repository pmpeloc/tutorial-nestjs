import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  findAll(): any {
    return 'Obtener lista de libros';
  }

  findOne(bookId: number): any {
    return 'Devuelve información sobre un libro específico';
  }
}
