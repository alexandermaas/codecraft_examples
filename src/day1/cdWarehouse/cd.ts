import {IPaymentProvider} from "./IPaymentProvider";

export class CD {
    static buy(cds: CD[], paymentProvider: IPaymentProvider) {
        if(cds.length>0){
            if(paymentProvider.performPayment()){
                return true
            }
        }
        return false;
    }
}