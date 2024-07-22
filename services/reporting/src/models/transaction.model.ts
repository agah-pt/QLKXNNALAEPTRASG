import { SupportedCurrencies, Transaction, TransactionType } from "./gen";

export class TransactionModelUtils {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromEventBridgeEvent(event: any): Transaction {

        const detail = event["detail"];

        return {
            transactionId: detail["transactionId"] as string,
            currency: detail["currency"] as SupportedCurrencies,
            type: detail["type"] as TransactionType,
            amount: detail["amount"] as number,
            createdAt: detail["createdAt"] as string,
        };
    }
}
