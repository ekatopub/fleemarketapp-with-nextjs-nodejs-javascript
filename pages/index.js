import Link from "next/link";
import Image from "next/image";

const ReadAllItems = (props) => {
	//console.log(props);
	return (
		<div>
			<div>
				{props.allItems.map((item) => (
					//console.log(item)
					<Link href={`/item/${item._id}`} key={item._id}>
						{/* <a> Next.js 13以降の新しい<Link>コンポーネントでは、子要素として<a>タグを直接使ってはいけない*/}
						<Image src={item.image} width={750} height={500} alt="item-image" />
						<div>
							<h2>￥{item.price}</h2>
							<h3>{item.title}</h3>
							<p>{item.description.substring(0, 80)}...</p>
						</div>
						{/* </a> */}
					</Link>
				))}
			</div>
		</div>
	);
};
export default ReadAllItems;

export const getServerSideProps = async () => {
	const response = await fetch("http://localhost:3000/api/item/readall");
	const allItems = await response.json();

	return {
		props: allItems, //これでpropsに入れてconst ReadAllItems = () => に渡す
	};
};
