import { CD } from './cd';
import { PaymentProvider } from './paymentProvider';
import { Warehouse } from './warehouse';

class dummyPaymentProvider implements PaymentProvider {
    constructor(private isSuccessful: boolean) {}

    processPayment(value: number): boolean {
        return this.isSuccessful;
    }
}

describe('CD Warehouse', () => {
    describe('buy a cd', () => {
        it('should reduce the stock by 1 when the payment provider accepts the payment', () => {
            const cd = new CD(5, 1, 'Artist', 'Title');
            const paymentProvider = new dummyPaymentProvider(true);
            cd.buy(paymentProvider);
            expect(cd.stock).toEqual(0);
        });

        it('should keep the stock the same if payment provider declines the payment', () => {
            const cd = new CD(4, 2, 'Artist', 'Title');
            const paymentProvider = new dummyPaymentProvider(false);
            cd.buy(paymentProvider);
            expect(cd.stock).toEqual(2);
        });

        it('should keep the stock the same if the stock is zero', () => {
            const cd = new CD(5, 0, 'Artist', 'Title');
            const paymentProvider = new dummyPaymentProvider(true);
            cd.buy(paymentProvider);
            expect(cd.stock).toEqual(0);
        });
    });

    describe('search a cd', () => {
        const cdBobMarley = new CD(5, 1, 'Bob Marley', 'Don\'t worry be happy');
        it('should return nothing in case there is no match', () => {
            const warehouse = new Warehouse([new CD(5, 1, 'Artist', 'Title')]);
            expect(warehouse.search(cdBobMarley.artist, cdBobMarley.title)).toEqual([]);
        });

        it('should return the cd in case there is a match', () => {
            const warehouse = new Warehouse([cdBobMarley, new CD(0, 0, '', '')]);
            expect(warehouse.search(cdBobMarley.artist, cdBobMarley.title)).toEqual([cdBobMarley]);
        });
    });
});
