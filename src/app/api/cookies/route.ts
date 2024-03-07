import { NextResponse } from 'next/server';

export async function POST (request: Request) {
	const { token } = await request.json();
	
	const response = NextResponse.json(token,{ status: 200 });
	
	response.cookies.set({
		name: "cookies_test",
		value: token,
		httpOnly: true,
		sameSite: "strict",
		path: "/",
	});


	
	return response
}
