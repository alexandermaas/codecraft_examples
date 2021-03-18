import {CD} from './cd';
import {IPaymentProvider} from './IPaymentProvider';
import {Warehouse} from './warehouse';
import {instance, mock, verify} from 'ts-mockito';
import {ICharts} from "./ICharts";

class DummyPaymentProvider implements IPaymentProvider {
    constructor(private isSuccessful: boolean) {}

    processPayment(value: number): boolean {
        return this.isSuccessful;
    }
}

export class DummyCharts implements ICharts{
    notifyCDsBought(cd: CD, quantity: number):undefined {
        return undefined;
    }
}

const cdBobMarley = new CD(5, 1, 'Bob Marley', "Don't worry be happy");
const mockCharts = mock(DummyCharts);
const charts = instance(mockCharts)
describe('CD Warehouse', () => {
    describe('buy a cd', () => {
        it('should reduce the stock by 1 when the payment provider accepts the payment', () => {
            const cd = new CD(5, 1, 'Artist', 'Title');
            const paymentProvider = new DummyPaymentProvider(true);
            cd.buy(paymentProvider, charts);
            expect(cd.stock).toEqual(0);
        });

        it('should keep the stock the same if payment provider declines the payment', () => {
            const cd = new CD(4, 2, 'Artist', 'Title');
            const paymentProvider = new DummyPaymentProvider(false);
            cd.buy(paymentProvider, charts);
            expect(cd.stock).toEqual(2);
        });

        it('should keep the stock the same if the stock is zero', () => {
            const cd = new CD(5, 0, 'Artist', 'Title');
            const paymentProvider = new DummyPaymentProvider(true);
            cd.buy(paymentProvider, charts);
            expect(cd.stock).toEqual(0);
        });
        it('should send message to the charts when CD is bought', () => {
            cdBobMarley.buy(new DummyPaymentProvider(true), charts)
            verify(mockCharts.notifyCDsBought(cdBobMarley, 1)).once();
        });
    });

    describe('search a cd', () => {
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
