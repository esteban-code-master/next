export interface ApiResponse<T> {
	headers: {
		success: boolean;
		status: number;
	};
	response: T;
	timestamp: string;
	path: string;
}
