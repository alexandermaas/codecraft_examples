export interface PaymentProvider {
    processPayment(value: number): boolean
}
