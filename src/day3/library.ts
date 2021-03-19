import {Book} from "./book";

export class Library {
    constructor(private books: Book[]) {

    }

    getBook(title: string, author: string) {
        return this.books.find(book => book.title === title && book.author === author)
    }
}