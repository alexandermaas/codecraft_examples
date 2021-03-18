import {CD} from "./cd";
import {instance, mock, reset, verify, when} from "ts-mockito";
import {IPaymentProvider} from "./IPaymentProvider";
import {ICharts} from "./ICharts";
import {ICompetitorAnalysis} from "./ICompetitorAnalysis";

class DummyCharts implements ICharts{
    notifyCDsBought(cd: CD, quantity: number):undefined {
        return undefined;
    }

    isCDInTop100(cd: CD): boolean {
        return false;
    }
}

class DummyPaymentProvider implements IPaymentProvider {
    constructor(private isSuccessful: boolean) {}

    processPayment(value: number): boolean {
        return this.isSuccessful;
    }
}

class DummyCompetitorAnalysis implements ICompetitorAnalysis {
    constructor(private lowestPrice:number) {}

    getLowestPriceForCD(cd: CD): number {
        return this.lowestPrice;
    }
}

const mockCharts = mock(DummyCharts);
const charts = instance(mockCharts);
const cdBobMarley = new CD(5, 1, 'Bob Marley', "Don't worry be happy");
describe('CD',() => {
    beforeEach(() => {
        reset(mockCharts)
    })
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
    describe('price',() => {
        it('should return original price if cd is in the top100', () => {
            const competitorAnalysis = new DummyCompetitorAnalysis(0)
            expect(cdBobMarley.getPrice(charts, competitorAnalysis)).toEqual(cdBobMarley.price)
        });
        it('should return lowest price minus 1 pound if the cd is in the top100', () => {
            const lowestPrice=4;
            const competitorAnalysis = new DummyCompetitorAnalysis(lowestPrice)
            when(mockCharts.isCDInTop100(cdBobMarley)).thenReturn(true);

            expect(cdBobMarley.getPrice(charts, competitorAnalysis)).toEqual(lowestPrice-1)
        });
    })
})