import {Book} from "./book";

export class Library {
    constructor(private books: Book[]) {

    }

    getBook(title: string, author: string) {
        const book = this.books.find(book => book.title === title && book.author === author)
        if(!book)
            throw new Error(`The book you are looking for ('${title}' by '${author}') does not exist in our database`)
        return book
    }
}