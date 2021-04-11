export interface Checke {
    id: number;
    payTo: string;
    checkNumber: string;
    amount: number;
    dateIssued: Date;
    dateCreated: Date;
    isReceived: boolean;
    receivedBy: string;
    amountInWords: string;
}