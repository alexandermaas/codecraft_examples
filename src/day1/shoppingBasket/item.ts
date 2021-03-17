export class Item {
    constructor(private price: number, private quantity: number) {
    }

    subtotal() {
        return this.price * this.quantity;
    }
}