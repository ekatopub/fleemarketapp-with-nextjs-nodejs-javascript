import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";

const getSingleItem = async (req, res) => {
	//awaitとasyncはペアで使う
	try {
		await connectDB();
		//console.log(req.query.id);
		const singleItem = await ItemModel.findById(req.query.id);
		//console.log(allItems);
		return res.status(200).json({
			message: "アイテム読み取り（1つ）成功",
			singleItem: singleItem,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "アイテム読み取り（1つ）失敗" });
	}
};

export default getSingleItem;
