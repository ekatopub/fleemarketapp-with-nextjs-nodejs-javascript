import jwt from "jsonwebtoken";
import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";

const secret_key = "nextmartket"; //jwt用

const loginUser = async (req, res) => {
	//awaitとasyncはペアで使う
	try {
		await connectDB();
		//console.log(req.body);
		const savedUserData = await UserModel.findOne({ email: req.body.email });
		//console.log(savedUserData);
		if (savedUserData) {
			//ユーザー登録がある場合の処理
			if (req.body.password === savedUserData.password) {
				//パスワードが正しい
				const payload = { email: req.body.email };
				const token = jwt.sign(payload, secret_key, { expiresIn: "23h" });
				console.log(token);
				return res.status(200).json({ message: "ログイン成功" });
			} else {
				//パスワードが違う
				return res
					.status(400)
					.json({ message: "ログイン失敗：パスワードが間違っています" });
			}
		} else {
			//ユーザー登録がない場合の処理
			return res
				.status(400)
				.json({ message: "ログイン失敗：ユーザー登録がありません" });
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "ログイン失敗" });
	}
};

export default loginUser;
