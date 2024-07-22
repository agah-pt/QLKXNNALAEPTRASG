// This file is auto-generated by @hey-api/openapi-ts

export type Month = number;

export type Year = number;

export type MonthlyReport = {
    month: Month;
    year: Year;
    accountId: UUID;
    currencies: Array<{
        currency: SupportedCurrencies;
        transactions: Array<StatementTransaction>;
    }>;
};

export type StatementTransaction = {
    transactionId: UUID;
    type: TransactionType;
    amount: TransactionAmount;
    createdAt: ISODate;
};

export type SupportedCurrencies = 'KWD' | 'BHD' | 'OMR' | 'JOD' | 'GIP' | 'GBP' | 'KYD' | 'CHF' | 'EUR' | 'USD';

export type TransactionType = 'INBOUND' | 'OUTBOUND';

export type TransactionAmount = number;

export type BalanceAmount = number;

export type UUID = string;

export type ISODate = string;

export type CurrencyBalance = {
    currency: SupportedCurrencies;
    amount: BalanceAmount;
};

export type EventTypes = 'account-created' | 'transaction-created';

export type AccountPartial = {
    supportedCurrencies: Array<SupportedCurrencies>;
};

export type Account = AccountPartial & {
    accountId: UUID;
};

export type AccountWithBalance = Account & {
    balances?: Array<CurrencyBalance>;
};

export type TransactionPartial = {
    currency: SupportedCurrencies;
    type: TransactionType;
    amount: TransactionAmount;
};

export type Transaction = TransactionPartial & {
    transactionId: UUID;
    createdAt: ISODate;
};

export type CreateAccountRequest = {
    supportedCurrencies?: Array<SupportedCurrencies>;
};

export type CreateAccountTransactionRequest = TransactionPartial;

export type UpdateAccountRequest = {
    supportedCurrencies?: Array<SupportedCurrencies>;
};

/**
 * The target account
 */
export type ParameterAccountIdPathParameter = UUID;

export type ParameterMonthPathParameter = Month;

export type ParameterYearPathParameter = Year;

export type PostV1AccountsData = {
    requestBody: CreateAccountRequest;
};

export type PostV1AccountsResponse = Account;

export type GetV1AccountsByAccountIdData = {
    /**
     * The target account
     */
    accountId: UUID;
};

export type GetV1AccountsByAccountIdResponse = AccountWithBalance;

export type PatchV1AccountsByAccountIdData = {
    /**
     * The target account
     */
    accountId: UUID;
    requestBody: CreateAccountRequest;
};

export type PatchV1AccountsByAccountIdResponse = Account;

export type PostV1AccountsByAccountIdTransactionsData = {
    /**
     * The target account
     */
    accountId: UUID;
    requestBody: TransactionPartial;
};

export type PostV1AccountsByAccountIdTransactionsResponse = Transaction;

export type GetV1AccountsByAccountIdTransactionsData = {
    /**
     * The target account
     */
    accountId: UUID;
};

export type GetV1AccountsByAccountIdTransactionsResponse = Array<Transaction>;

export type GetV1ReportsByAccountIdByYearByMonthData = {
    /**
     * The target account
     */
    accountId: UUID;
    month: Month;
    year: Year;
};

export type GetV1ReportsByAccountIdByYearByMonthResponse = MonthlyReport;

export type $OpenApiTs = {
    '/v1/accounts': {
        post: {
            req: PostV1AccountsData;
            res: {
                /**
                 * Account created with success
                 */
                200: Account;
            };
        };
    };
    '/v1/accounts/{account_id}': {
        get: {
            req: GetV1AccountsByAccountIdData;
            res: {
                /**
                 * Account retrieved with success
                 */
                200: AccountWithBalance;
            };
        };
        patch: {
            req: PatchV1AccountsByAccountIdData;
            res: {
                /**
                 * Account retrieved with success
                 */
                200: Account;
            };
        };
    };
    '/v1/accounts/{account_id}/transactions': {
        post: {
            req: PostV1AccountsByAccountIdTransactionsData;
            res: {
                /**
                 * Account transaction created with success
                 */
                200: Transaction;
            };
        };
        get: {
            req: GetV1AccountsByAccountIdTransactionsData;
            res: {
                /**
                 * Account transactions retrieved with success
                 */
                200: Array<Transaction>;
            };
        };
    };
    '/v1/reports/{account_id}/{year}/{month}': {
        get: {
            req: GetV1ReportsByAccountIdByYearByMonthData;
            res: {
                /**
                 * Monlty report for an account
                 */
                200: MonthlyReport;
            };
        };
    };
};