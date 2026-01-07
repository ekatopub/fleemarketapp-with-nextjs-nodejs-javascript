import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
//import jwt from "jsonwebtoken"; //Node.js専用　フロントエンドでは動作しない
const secret_key = "nextmarket";

const useAuth = () => {
	const [loginUser, setLoginUser] = useState(""); //update,deleteにトークン解析結果を送る
	const router = useRouter();
	useEffect(() => {
		//表示より先に処理する
		const token = localStorage.getItem("token");

		if (!token) {
			router.push("/user/login");
		}
		// ↓ 追加
		try {
			//const decoded = jwt.verify(token, secret_key);//Node.js専用　フロントエンドでは動作しない
			const decoded = jwtDecode(token, secret_key);
			setLoginUser(decoded.email);
		} catch (error) {
			console.log(error);
			router.push("/user/login");
		}
	}, [router]);
	return loginUser; //ログインユーザーのメールアドレスを返す
};
export default useAuth;
