import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

const getAllItems = async (req, res) => {
	//awaitとasyncはペアで使う
	try {
		await connectDB();
		//console.log(req.body);
		const allItems = await ItemModel.find();
		console.log(allItems);
		return res.status(200).json({
			message: "アイテム読み取り（全部）成功",
			allItems: allItems,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "アイテム読み取り（全部）失敗" });
	}
};

export default getAllItems;
