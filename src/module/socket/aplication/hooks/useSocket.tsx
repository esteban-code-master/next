import { configEnvironment } from "@core/environment";
import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export const useSocket = () => {
	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		socketRef.current = io(configEnvironment.API_QUICKLY_SERVICE_WEBSOCKET);

		socketRef.current.on("connect", () => {
			console.log(
				"conectado al web socket",
				configEnvironment.API_QUICKLY_SERVICE_WEBSOCKET
			);
		});

		socketRef.current.on("disconnect", () => {
			console.log("Desconectado del servidor de Socket.IO");
		});

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
			}
		};
	}, []);

	return socketRef;
};
