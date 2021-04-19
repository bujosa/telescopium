import mongoose from "mongoose";

export interface Paymnet {
  order: string;
  stripe: string;
}

export interface PaymentDoc extends mongoose.Document {
  order: string;
  stripe: string;
  version: number;
}

export interface PaymentModel extends mongoose.Model<PaymentDoc> {}
