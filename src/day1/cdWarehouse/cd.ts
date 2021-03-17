import {IPaymentProvider} from "./IPaymentProvider";

export class CD {
    static buy(cds: CD[], paymentProvider1: IPaymentProvider) {
        if(cds.length>0){
            if(paymentProvider1.performPayment()){
                return true
            }
        }
        return false;
    }
}