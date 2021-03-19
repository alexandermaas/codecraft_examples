import {Book} from "./book";
import {Library} from "./library";

const maxHavelaarBook = new Book("Max Havelaar", "Multatuli")
const harryPotterBook = new Book("Harry Potter: Chamber of secrets", "J.K. Rowling")

describe('Search cheapest price for book title', () => {
    describe('Book was found', () => {
        it('should return single book in case there is only one item in the library', () => {
            const library = new Library([maxHavelaarBook]);
            const book = library.getBook(maxHavelaarBook.title, maxHavelaarBook.author);
            expect(book).toEqual(maxHavelaarBook)
        });
        it('should return single book in case there is are multiple items in the library', () => {
            const library = new Library([maxHavelaarBook, harryPotterBook]);
            const book = library.getBook(harryPotterBook.title, harryPotterBook.author);
            expect(book).toEqual(harryPotterBook)
        });
    })
    describe('Book was not found',() => {
        it('should throw error in case library is empty', () => {
            const library: Library= new Library([]);
            expect(()=>{library.getBook(maxHavelaarBook.title, maxHavelaarBook.author)}).toThrowError("The book you are looking for ('Max Havelaar' by 'Multatuli') does not exist in our database")
        });
        it('should throw error in case book does not exist in library', () => {
            const library: Library = new Library([maxHavelaarBook]);
            expect(()=>{library.getBook(harryPotterBook.title, harryPotterBook.author)}).toThrowError("The book you are looking for ('Harry Potter: Chamber of secrets' by 'J.K. Rowling') does not exist in our database")
        });
    })
})