import mongoose from "mongoose";
import {
  Payment,
  PaymentDoc,
  PaymentModel,
} from "../interfaces/payment.interface";

const paymentSchema = new mongoose.Schema(
  {
    order: {
      required: true,
      type: String,
    },
    stripe: {
      required: true,
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

paymentSchema.statics.build = (payment: Payment) => {
  return new Payment(payment);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  paymentSchema
);

export { Payment };
