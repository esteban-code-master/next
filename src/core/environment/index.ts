export const configEnvironment: Environment = {
	API_QUICKLY_SERVICE: 'http://localhost:3005',
	API_QUICKLY_SERVICE_WEBSOCKET: 'http://localhost:3007',
	CONTAINER_IMAGES_SHOPS: 'http://localhost:3005'
};


export interface Environment {
	API_QUICKLY_SERVICE: string,
	API_QUICKLY_SERVICE_WEBSOCKET: string,
	CONTAINER_IMAGES_SHOPS: string
}