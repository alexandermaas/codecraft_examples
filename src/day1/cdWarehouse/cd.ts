import {IPaymentProvider} from "./IPaymentProvider";
import {ICharts} from "./ICharts";

export class CD {
    constructor(private price: number, public stock: number, public artist: string, public title: string) {
    }

    buy(paymentProvider: IPaymentProvider, charts: ICharts): number | undefined {
        if (this.stock === 0) {
            return this.stock;
        }
        if (paymentProvider.processPayment(this.price)) {
            charts.notifyCDsBought(this,1);
            return this.stock--;
        }
    }
}
