import {CD} from "./cd";
import {IPaymentProvider} from "./IPaymentProvider";

class dummyPaymentProvider implements IPaymentProvider{
    performPayment(): boolean {
        return true;
    }
}

describe('CD',() => {
    describe('buy',() => {
        it('should return false if there are no CDs to buy', () => {
            const paymentProvider = new dummyPaymentProvider()
            expect(CD.buy([], paymentProvider)).toEqual(false)
        });
        it('should return true if there are CDs to buy and payment provider approves', () => {
            const cd = new CD();
            const paymentProvider = new dummyPaymentProvider()
            expect(CD.buy([cd], paymentProvider)).toEqual(true)
        });
    })
})