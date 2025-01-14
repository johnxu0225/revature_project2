export interface Transaction {
  transactionId: number;
  title: string;
  transactionAmount: number;
  datetime: Date;
  transactionDescription: string;
  category: string;
}

export interface OutgoingTransaction {
  title: string;
  transactionAmount: number;
  transactionDescription: string;
  category: string;
}

export interface Envelope {
  envelopeId: number;
  user: User;
  envelopeDescription: string;
  maxLimit: number;
  balance: number;
}

export interface EnvelopeHistory {
  amountHistoryId: number;
  envelope: Envelope;
  transaction: Transaction;
  envelopeAmount: number;
}

export interface User {
  userId: number,
	firstName: string,
	lastName: string
	username: string,
  email: string,
	role: string,
}
