import jwt from "jsonwebtoken";

const secret_key = "nextmartket"; //jwt用

const auth = (handler) => {
	return async (req, res) => {
		if (req.method === "GET") {
			return handler(req, res);
		} //ログイン状態の確認が必要なのはPOST（修正・削除）のときのみ

		//const token =
		//("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtYWlsQHRlc3QuY29tIiwiaWF0IjoxNzU5NjQ5OTI3LCJleHAiOjE3NTk3MzI3Mjd9.Q50F558mcFHb32SkQEV8AsUuooAoTzgtvAadu_k8uFA");
		const token = await req.headers.authorization?.split(" ")[1]; //トークン受け取り
		if (!token) {
			return res.status(401).json({ message: "トークンがありません" });
		}
		try {
			const decoded = jwt.verify(token, secret_key);
			//console.log(decoded);
			req.body.email = decoded.email; //修正・削除リクエストにemailを追加する
			return handler(req, res);
		} catch (err) {
			return res.status(401).json({
				message: "トークンが正しくありません。ログインしてください。",
			});
		}
	};
};
export default auth;
