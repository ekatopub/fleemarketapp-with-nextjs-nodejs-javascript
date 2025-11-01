import Image from "next/image";
import Link from "next/link";

const ReadSingleItem = (props) => {
	if (!props.singleItem) return <div>Not Found</div>;
	//console.log(props);
	return (
		<div>
			<div>
				<Image
					src={props.singleItem.image}
					width={750}
					height={500}
					alt="item-image"
				/>
			</div>
			<div>
				<h2>￥{props.singleItem.price}</h2>
				<h3>{props.singleItem.title}</h3>
				<hr />
				<p>{props.singleItem.description}</p>
				<div>
					<Link href={`/item/update/${props.singleItem._id}`}>
						アイテム編集　
					</Link>
					<Link href={`/item/delete/${props.singleItem._id}`}>
						アイテム削除
					</Link>
				</div>
			</div>
		</div>
	);
};
export default ReadSingleItem;

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
			singleItem: data.singleItem || null, //これでpropsに入れてconst ReadSingleItem = () => に渡す
		},
	};
};
