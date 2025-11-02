export default function auth(handler) {
	return async (req, res) => {
		// 簡易チェック：Authorization ヘッダがなければ拒否
		const authHeader = req.headers?.authorization || "";
		if (!authHeader) {
			return res.status(401).json({ error: "Not authorized" });
		}

		// ここでトークン検証やユーザー付与を行う（必要なら jwt.verify 等を追加）
		// req.user = { ... }

		return handler(req, res);
	};
}
