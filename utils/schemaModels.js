import mongoose from "mongoose"; //find()などのメソッドはmongooseが自動作成しているイメージ

const Schema = mongoose.Schema;
const ItemSchema = new Schema({
	title: String,
	image: String,
	price: String,
	description: String,
	email: String,
});

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});
// 「OverwriteModelError」のため修正: 既存モデルがあればそれを使う
export const ItemModel =
	mongoose.models.Item || mongoose.model("Item", ItemSchema);
export const UserModel =
	mongoose.models.User || mongoose.model("User", UserSchema);
