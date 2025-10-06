//import Image from "next/image";
import { useState } from "react";

const UpdateItem = (props) => {
	//console.log(props);
	const [title, setTitle] = useState(props.singleItem.title);
	const [price, setPrice] = useState(props.singleItem.price);
	const [image, setImage] = useState(props.singleItem.image);
	const [description, setDescription] = useState(props.singleItem.description);
	if (!props.singleItem) return <div>Not Found</div>;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/item/update/${props.singleItem._id}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("token")}`,
				}, //JWTではBearerが慣習的に使われているがマストではない
				body: JSON.stringify({
					title: title,
					price: price,
					image: image,
					description: description,
				}),
			});
			console.log(
				"response.headers.authorization:" + response.headers.authorization
			);
			const jsonData = await response.json();
			alert(jsonData.message);
		} catch (err) {
			alert("アイテム編集失敗");
		}
	};

	return (
		<div>
			<h1>アイテム編集</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					name="title"
					placeholder="タイトル"
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
					name="image"
					placeholder="画像"
					required
				/>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					type="text"
					name="description"
					rows={15}
					placeholder="商品説明"
					required></textarea>

				<button>編集</button>
			</form>
		</div>
	);
};

export default UpdateItem;

export const getServerSideProps = async (context) => {
	const baseUrl = process.env.VERCEL_URL //Vercelが自動で本番環境にセットしてくれる環境変数
		? `https://${process.env.VERCEL_URL}`
		: "http://localhost:3000";
	const response = await fetch(`${baseUrl}/api/item/${context.query.id}`);

	const contentType = response.headers.get("content-type") || "";
	if (!contentType.includes("application/json")) {
		console.error("API did not return JSON:", await response.text());
		return { notFound: true }; //Vercelエラー対策
	}

	const data = await response.json();
	//console.log(context);

	return {
		props: {
			singleItem: data.singleItem || null, //これでpropsに入れてconst UpdateItem = () => に渡す
		},
	};
};
