const express = require("express");
const readFile = require("./inputData/readFile");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/api/report_input", async (req, res) => {
	var data = await readFile.parseInput();
	res.send(data);
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
