import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";

import { configEnvironment } from "@core/environment";

@injectable()
export class GetProduct {
	businessId = "65848f94cf9d81d1517a76d0";
	// constructor(@inject(BUSINESS_ID) private readonly businessId: string) {}

	get Endpoint() {
		return `${configEnvironment.API_QUICKLY_SERVICE}/restaurant/${this.businessId}/product`;
	}

	public async execute() {
		return await axios.get(this.Endpoint);
	}
}
