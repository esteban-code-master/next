// const https = require("https");
// const fs = require("fs");
// const express = require("express");
// const app = express();
// const options = {
// 	key: fs.readFileSync("./localhost-key.pem"), // Reemplaza con la ruta de tu llave generada
// 	cert: fs.readFileSync("./localhost.pem") // Reemplaza con la ruta de tu certificado generado
// };
// app.use((req, res, next) => {
// 	res.send("<h1>HTTPS Works!</h1>");
// });
// const port = 3002;
// https.createServer(options, app).listen(port, () => {
// 	console.log("Server listening on port " + port);
// });

// const { createServer } = require("http");
// const fs = require("fs");
// const { parse } = require("url");
// const next = require("next");

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = 3002;
// when using middleware `hostname` and `port` must be provided below
// const options = {
// 	key: fs.readFileSync("./localhost-key.pem"), // Reemplaza con la ruta de tu llave generada
// 	cert: fs.readFileSync("./localhost.pem") // Reemplaza con la ruta de tu certificado generado
// };

// const app = next({ dev: true, hostname, port });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
// 	createServer(options, async (req, res) => {
// 		try {
// 			// Be sure to pass `true` as the second argument to `url.parse`.
// 			// This tells it to parse the query portion of the URL.
// 			const parsedUrl = parse(req.url, true);
// 			const { pathname, query } = parsedUrl;

// 			if (pathname === "/a") {
// 				await app.render(req, res, "/a", query);
// 			} else if (pathname === "/b") {
// 				await app.render(req, res, "/b", query);
// 			} else {
// 				await handle(req, res, parsedUrl);
// 			}
// 		} catch (err) {
// 			console.error("Error occurred handling", req.url, err);
// 			res.statusCode = 500;
// 			res.end("internal server error");
// 		}
// 	})
// 		.once("error", (err) => {
// 			console.error(err);
// 			process.exit(1);
// 		})
// 		.listen(port, () => {
// 			console.log(`> Ready on http://${hostname}:${port}`);
// 		});
// });

const https = require("https");
const fs = require("fs");
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: true });
const handle = app.getRequestHandler();

const options = {
	key: fs.readFileSync("./localhost-key.pem"), // Reemplaza con la ruta de tu llave generada
	cert: fs.readFileSync("./localhost.pem") // Reemplaza con la ruta de tu certificado generado
};

app
	.prepare()
	.then(() => {
		const server = express();

		server.all("*", (req, res) => {
			return handle(req, res);
		});

		const port = 3002;
		https.createServer(options, server).listen(port, (err) => {
			if (err) throw err;
			console.log(`Server listening on https://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error("Error preparing Next.js app:", err);
	});
