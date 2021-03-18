import {PaymentProvider} from "./paymentProvider";

export class CD {
    constructor(private price: number, public stock: number, public artist: string, public title: string) {
    }

    buy(paymentProvider: PaymentProvider): number {
        if (this.stock === 0) {
            return this.stock;
        }
        if (paymentProvider.processPayment(this.price)) {
            return this.stock--;
        }
    }
}
