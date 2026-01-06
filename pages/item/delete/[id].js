import Image from "next/image";

const DeleteItem = (props) => {
	//console.log(props);

	if (!props.singleItem) return <div>Not Found</div>;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/item/delete/${props.singleItem._id}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("token")}`,
				}, //JWTではBearerが慣習的に使われているがマストではない
			});
			console.log(
				"response.headers.authorization:" + response.headers.authorization
			);
			const jsonData = await response.json();
			alert(jsonData.message);
		} catch (err) {
			alert("アイテム削除失敗");
		}
	};

	return (
		<div>
			<h1>アイテム削除</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<h2>{props.singleItem.title}</h2>
					<Image
						src={props.singleItem.image}
						width={750}
						height={500}
						alt="item-image"
					/>
				</div>
				<div>
					<h3>￥{props.singleItem.price}</h3>
					<p>{props.singleItem.description}</p>
				</div>

				<button>削除</button>
			</form>
		</div>
	);
};

export default DeleteItem;

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
			singleItem: data.singleItem || null, //これでpropsに入れてconst DeleteItem = () => に渡す
		},
	};
};
