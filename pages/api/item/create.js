import connectDB from "../../../utils/database";
import auth from "../../../utils/auth";
import { ItemModel } from "../../../utils/schemaModels";

// pages/api/item/create.js
const createItem = async (req, res) => {
	//awaitとasyncはペアで使う
	try {
		await connectDB();
		//console.log(req.body);
		await ItemModel.create(req.body);
		return res.status(200).json({ message: "アイテム作成成功" });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "アイテム作成失敗" });
	}
};

export default auth(createItem);
