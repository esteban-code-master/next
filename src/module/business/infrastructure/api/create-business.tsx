import axios from "axios";

export class CreateBusiness {
	public async execute() {
		const token = await axios.post("/cookies", {
			token: "HOLA PARAMETOR NUEVO",
		});

		return token;
	}
}
