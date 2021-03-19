import {Book} from "./book";
import {Library} from "./library";

const maxHavelaarBook = new Book("Max Havelaar", "Multatuli")
describe('Search cheapest price for book title', () => {
    describe('Book was found', () => {
        it('should return single book in case there is only one item in the book list', () => {
            const library = new Library([maxHavelaarBook]);
            const book = library.getBook(maxHavelaarBook.title, maxHavelaarBook.author);
            expect(book).toEqual(maxHavelaarBook)
        });
    })
})