import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";

const updateItem = async (req, res) => {
	//awaitとasyncはペアで使う
	console.log(req);

	try {
		await connectDB();
		//console.log(req.query.id);
		const singleItem = await ItemModel.findById(req.query.id);

		if (singleItem.email === req.body.email) {
			//ログインユーザーとアイテムオーナーのemailを突き合わせる
			await ItemModel.updateOne({ _id: req.query.id }, req.body);
			//バックエンド＋仮フォームだけだと全部の情報を再入力必要だが、元の情報を読みこむロジックはフロントエンドで追加すればOK

			return res.status(200).json({
				message: "アイテム編集成功",
			});
		} else {
			throw new Error();
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "アイテム編集失敗" });
	}
};

export default auth(updateItem);
