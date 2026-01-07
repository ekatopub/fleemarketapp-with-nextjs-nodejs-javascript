import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const ReadAllItems = (props) => {
	console.log(props);
	return (
		<div>
			<Head>
				<title>Next Market</title>
			</Head>
			<div className="grid-container-in">
				{props.allItems.map(
					(
						item //mapで配列を個別データに分ける　分割したデータにはkey設定必要
					) => (
						//console.log(item)
						<Link href={`/item/${item._id}`} key={item._id} className="card">
							{/* <a className="card"> Next.js 13以降の新しい<Link>コンポーネントでは、子要素として<a>タグを直接使ってはいけない*/}
							<Image
								src={item.image}
								//width={750}
								//height={500}
								width={300}
								height={200}
								alt="item-image"
								//style={{ objectFit: "cover" }}
								className="card-img"
							/>
							<div className="texts-area">
								<h2>￥{item.price}</h2>
								<h3>{item.title}</h3>
								<p>{item.description.substring(0, 80)}...</p>
							</div>
							{/* </a> */}
						</Link>
					)
				)}
			</div>
		</div>
	);
};
export default ReadAllItems;

export const getServerSideProps = async () => {
	//getServerSidePropsはNext.jsが用意しているデータ取得のための特別な機能
	const baseUrl = process.env.VERCEL_URL //Vercelが自動で本番環境にセットしてくれる環境変数
		? `https://${process.env.VERCEL_URL}`
		: "http://localhost:3000";
	const response = await fetch(`${baseUrl}/api/item/readall`);

	const contentType = response.headers.get("content-type") || "";
	if (!contentType.includes("application/json")) {
		console.error("API did not return JSON:", await response.text());
		return { notFound: true }; //Vercelエラー対策
	}

	const data = await response.json();

	return {
		props: { allItems: data.allItems || [] }, //これでpropsに入れてconst ReadAllItems = () => に渡す
	};
};
