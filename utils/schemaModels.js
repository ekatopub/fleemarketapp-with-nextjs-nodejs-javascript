import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: String,
		price: Number,
		// 必要なフィールドを追加
	},
	{ timestamps: true }
);

export const ItemModel =
	mongoose.models.Item || mongoose.model("Item", ItemSchema);
