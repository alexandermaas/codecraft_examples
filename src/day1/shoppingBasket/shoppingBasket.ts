import {Item} from "./item";

export class ShoppingBasket {
    private items: Item[] = [];

    constructor(items: Item[]) {
        this.items = items;
    }

    total(): number {
        if (this.items.length == 0) {
            return 0;
        } else {
            return this.items.reduce((sum, item) => sum + item.subtotal(), 0);
        }
    }
}
