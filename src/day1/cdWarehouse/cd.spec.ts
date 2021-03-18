import {CD} from "./cd";
import {instance, mock, verify} from "ts-mockito";
import {IPaymentProvider} from "./IPaymentProvider";
import {ICharts} from "./ICharts";

class DummyCharts implements ICharts{
    notifyCDsBought(cd: CD, quantity: number):undefined {
        return undefined;
    }
}

class DummyPaymentProvider implements IPaymentProvider {
    constructor(private isSuccessful: boolean) {}

    processPayment(value: number): boolean {
        return this.isSuccessful;
    }
}

const mockCharts = mock(DummyCharts);
const charts = instance(mockCharts);
const cdBobMarley = new CD(5, 1, 'Bob Marley', "Don't worry be happy");
describe('CD',() => {
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
})