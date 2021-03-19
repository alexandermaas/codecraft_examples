import {CD} from "./cd";
import {IPaymentProvider} from "./IPaymentProvider";
import {ICharts} from "./ICharts";
import {ICompetitorAnalysis} from "./ICompetitorAnalysis";
import {mock, mockReset} from "jest-mock-extended";
import {when} from "jest-when";

const mockCharts = mock<ICharts>();
const mockPaymentProvider = mock<IPaymentProvider>();
const mockCompetitorAnalysis = mock<ICompetitorAnalysis>();
const cdBobMarley = new CD(5, 1, 'Bob Marley', "Don't worry be happy");
describe('CD', () => {
    beforeEach(() => {
        mockReset(mockCharts)
        mockReset(mockPaymentProvider)
        mockReset(mockCompetitorAnalysis)
    })
    describe('buy a cd', () => {
        describe('payment successful',() => {
            beforeEach(() => {
                when(mockPaymentProvider.processPayment).calledWith(5).mockReturnValue(true)
            })
            it('should reduce the stock by 1 when the payment provider accepts the payment', () => {
                const cd = new CD(5, 1, 'Artist', 'Title');
                cd.buy(mockPaymentProvider, mockCharts);
                expect(cd.stock).toEqual(0);
            });
            it('should keep the stock the same if the stock is zero', () => {
                const cd = new CD(5, 0, 'Artist', 'Title');
                cd.buy(mockPaymentProvider, mockCharts);
                expect(cd.stock).toEqual(0);
            });
            it('should send message to the charts when CD is bought', () => {
                cdBobMarley.buy(mockPaymentProvider, mockCharts)
                expect(mockCharts.notifyCDsBought).toHaveBeenCalledWith(cdBobMarley, 1);
            });
        })
        describe('payment unsuccessful',() => {
            beforeEach(() => {
                when(mockPaymentProvider.processPayment).calledWith(4).mockReturnValue(false)
            })
            it('should keep the stock the same if payment provider declines the payment', () => {
                const cd = new CD(4, 2, 'Artist', 'Title');
                cd.buy(mockPaymentProvider, mockCharts);
                expect(cd.stock).toEqual(2);
            });
        })
    });
    describe('price', () => {
        it('should return original price if cd is not in the top100', () => {
            when(mockCharts.isCDInTop100).calledWith(cdBobMarley).mockReturnValue(false);
            when(mockCompetitorAnalysis.getLowestPriceForCD).calledWith(cdBobMarley).mockReturnValue(1)
            expect(cdBobMarley.getPrice(mockCharts, mockCompetitorAnalysis)).toEqual(cdBobMarley.price)
        });
        it('should return lowest price minus 1 pound if the cd is in the top100', () => {
            const lowestPrice = 4;
            when(mockCharts.isCDInTop100).calledWith(cdBobMarley).mockReturnValue(true);
            when(mockCompetitorAnalysis.getLowestPriceForCD).calledWith(cdBobMarley).mockReturnValue(lowestPrice)

            expect(cdBobMarley.getPrice(mockCharts, mockCompetitorAnalysis)).toEqual(lowestPrice - 1)
        });
    })
})