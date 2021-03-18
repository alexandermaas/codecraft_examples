import {IPaymentProvider} from "./IPaymentProvider";
import {ICharts} from "./ICharts";

export class CD {
    constructor(public price: number, public stock: number, public artist: string, public title: string) {
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

    getPrice(charts: ICharts, competitorAnalysis: any) {
        if(charts.isCDInTop100(this)){
            const lowestPrice = competitorAnalysis.getLowestPriceForCD(this)
            return lowestPrice-1
        }
        return this.price;
    }
}
