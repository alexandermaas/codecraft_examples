import {ShoppingBasket} from './shoppingBasket';
import {Item} from "./item";

describe('ShoppingBasket', () => {
    describe('total', () => {
        it('should give 0 as result for empty basket', () => {
            const basket: ShoppingBasket = new ShoppingBasket([]);
            expect(basket.total()).toEqual(0.0);
        });

        [100, 50].forEach((price) => {
            it(`should give ${price} total for basket with single item of price ${price}`, () => {
                const basket: ShoppingBasket = new ShoppingBasket([new Item(price, 1)]);
                expect(basket.total()).toEqual(price);
            });
        });

        it('should give 150 total for basket with item price 100 and item price 50', () => {
            const basket: ShoppingBasket = new ShoppingBasket([new Item(100, 1), new Item(50, 1)]);
            expect(basket.total()).toEqual(150);
        });

        it('should give price 200 for basket with single item with quantity 2 and price 100', () => {
            const basket: ShoppingBasket = new ShoppingBasket([new Item(100, 2)]);
            expect(basket.total()).toEqual(200);
        });
    });
});
