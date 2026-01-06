// pages/item/create.js
import { useState } from "react"; // 追加

const CreateItem = () => {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault(); //ブラウザのリロードを止める
		try {
			//トークン形式ずれへの対応
			const token = localStorage.getItem("token");
			//			const bearerToken =
			//				token && token.startsWith("Bearer ") ? token.split(" ")[1] : "";
			// トークンのデバッグ出力
			//console.log("localStorage token:", token);
			let bearerToken = "";
			if (token) {
				if (token.startsWith("Bearer ")) {
					bearerToken = token.split(" ")[1];
				} else {
					bearerToken = token;
				}
			}
			//console.log("送信するAuthorizationヘッダー: Bearer", bearerToken);

			const response = await fetch("http://localhost:3000/api/item/create", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					//					authorization: `Bearer ${
					//						localStorage.getItem("token").split(" ")[1]
					//					}`,
					Authorization: `Bearer ${bearerToken}`,
				},

				body: JSON.stringify({
					title: title,
					price: price,
					image: image,
					description: description,
				}),
			});
			const jsonData = await response.json();
			alert(jsonData.message);
		} catch (err) {
			alert(" アイテム作成失敗 ");
		}
	};
	return (
		<div>
			<h1> アイテム作成 </h1>
			<form onSubmit={handleSubmit}>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					name="title"
					placeholder="アイテム名"
					required
				/>
				<input
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					type="text"
					name="price"
					placeholder="価格"
					required
				/>
				<input
					value={image}
					onChange={(e) => setImage(e.target.value)}
					type="text"
					nam7e="image"
					placeholder="画像"
					required
				/>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					name="description"
					rows={15}
					placeholder="商品説明"
					required></textarea>

				<button>作成</button>
			</form>
		</div>
	);
};

export default CreateItem;
