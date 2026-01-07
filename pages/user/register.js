import { useState } from "react";
import Head from "next/head";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	//console.log(name);

	const handleSubmit = async (e) => {
		e.preventDefault(); //送信処理後のリロードを止める
		try {
			const response = await fetch("http://localhost:3000/api/user/register", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					email: email,
					password: password,
				}),
			});
			const jsonData = await response.json(); //ストリーム形式のレスポンスデータをJSON 形式へと変換
			alert(jsonData.message);
		} catch (err) {
			alert("ユーザー登録失敗");
		}
	};

	return (
		<div>
			<Head>
				<title> ユーザー登録 </title>
			</Head>
			<h1 className="page-title"> ユーザー登録 </h1>
			<form onSubmit={handleSubmit}>
				<input
					value={name}
					onChange={(e) => {
						//<input> に入力された名前のデータを、state である name に保管
						//onChangeで、eの中のデータをnameにデータを書き込むsetNameに渡す
						setName(e.target.value);
						//	console.log(e);
					}} //eの中には様々なデータが入っているのでe.target.valueのように指定する
					type="text"
					name="name"
					placeholder="名前"
					required
				/>
				<input
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					type="text"
					name="email"
					placeholder="メールアドレス"
					required
				/>
				<input
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					type="text"
					name="password"
					placeholder="パスワード"
					required
				/>

				<button>登録</button>
			</form>
		</div>
	);
};
export default Register;
