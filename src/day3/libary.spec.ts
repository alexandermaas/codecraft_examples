import {Book} from "./book";
import {Library} from "./library";
import {mock} from "jest-mock-extended";

const maxHavelaarBook = new Book("Max Havelaar", "Multatuli")
const harryPotterBook1 = new Book("Harry Potter: Philosopher stone", "J.K. Rowling")
const harryPotterBook2 = new Book("Harry Potter: Chamber of secrets", "J.K. Rowling")

class Listing {
    constructor(bookStoreName: string, price: number, link: string) {
    }
}

class MarketPlace {
    getListing(book: Book) {
        return new Listing("Amazon", 9.99, "http://amazon.com/multatuli/buy")
    }
}

describe('Library', () => {
    describe('Book was found', () => {
        it('should return single book in case there is only one item in the library', () => {
            const library = new Library([maxHavelaarBook]);
            const book = library.getBook(maxHavelaarBook.title, maxHavelaarBook.author);
            expect(book).toEqual(maxHavelaarBook)
        });
        it('should return single book in case there is are multiple items in the library', () => {
            const library = new Library([maxHavelaarBook, harryPotterBook2]);
            const book = library.getBook(harryPotterBook2.title, harryPotterBook2.author);
            expect(book).toEqual(harryPotterBook2)
        });
    })
    describe('Book was not found', () => {
        it('should throw error in case library is empty', () => {
            const library: Library = new Library([]);
            expect(() => {
                library.getBook(maxHavelaarBook.title, maxHavelaarBook.author)
            }).toThrowError("The book you are looking for ('Max Havelaar' by 'Multatuli') does not exist in our database")
        });
        it('should throw error in case book does not exist in library', () => {
            const library: Library = new Library([maxHavelaarBook]);
            expect(() => {
                library.getBook(harryPotterBook2.title, harryPotterBook2.author)
            }).toThrowError("The book you are looking for ('Harry Potter: Chamber of secrets' by 'J.K. Rowling') does not exist in our database")
        });
    })
    describe('Multiple books same author', () => {
        it('should return all books of the author in the library', () => {
            let library: Library = new Library([maxHavelaarBook, harryPotterBook1, harryPotterBook2]);
            const books = library.getBooks(harryPotterBook1.author);
            expect(books).toEqual([harryPotterBook1, harryPotterBook2])
        });
        it('should return the only book of the author in the library', () => {
            let library: Library = new Library([maxHavelaarBook, harryPotterBook1, harryPotterBook2]);
            const books = library.getBooks(maxHavelaarBook.author);
            expect(books).toEqual([maxHavelaarBook])
        });
    })
    describe('One cheapest store', () => {
        it('should return the cheapest store when we search for a book', () => {
            const expectedListing = new Listing("Amazon", 9.99, "http://amazon.com/multatuli/buy")
            const marketPlace = new MarketPlace()
            const listing = marketPlace.getListing(maxHavelaarBook)
            expect(listing).toEqual(expectedListing)
        });
    })
})