import Image from "next/image";

const ReadSingleItem = (props) => {
	if (!props.singleItem) return <div>Not Found</div>;
	console.log(props);
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
	const data = await response.json();
	//console.log(context);

	return {
		props: {
			singleItem: data.singleItem || null, //これでpropsに入れてconst ReadSingleItem = () => に渡す
		},
	};
};
