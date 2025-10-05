// pages/api/hello.js
const hello = (req, res) => {
	return res.status(200).json({ message: "こんにちは" });
};

export default hello;
