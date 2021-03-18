export interface IPaymentProvider {
    processPayment(value: number): boolean
}
