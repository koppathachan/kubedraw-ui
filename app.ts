import express from "express";
import * as bodyparser from "body-parser";
export class App {
	constructor(
		private app: express.Application = express()
	) {
		this.app.use(express.static("dist"));
		this.app.use(bodyparser.json());
		this.app.use(bodyparser.urlencoded({ extended: false }))
	}

	start(port: number) {
		this.app.listen(port, () =>
			console.log(`express server started at http://localhost:${port}`))
	}
}

new App().start(3001)