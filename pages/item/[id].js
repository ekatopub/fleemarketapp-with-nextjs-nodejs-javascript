import Image from "next/image";

const ReadSingleItem = (props) => {
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
			</div>
		</div>
	);
};
export default ReadSingleItem;

export const getServerSideProps = async (context) => {
	const response = await fetch(
		`http://localhost:3000/api/item/${context.query.id}`
	);
	const singleItem = await response.json();
	//console.log(context);

	return {
		props: singleItem, //これでpropsに入れてconst ReadSingleItem = () => に渡す
	};
};
