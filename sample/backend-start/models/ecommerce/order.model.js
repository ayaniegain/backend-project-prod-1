import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    orderItems: {
      type: [orderItemSchema],
    },

    address: {
      type: String,
      required: true,
    },
    status: {
      required: true,
      enum: ["DELIVERED", "PENDING", "CANCELLED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
