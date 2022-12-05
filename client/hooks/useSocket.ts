import {useEffect, useRef} from 'react';
import io, {ManagerOptions, Socket, SocketOptions} from 'socket.io-client';

const useSocket = (url: string, options?: Partial<ManagerOptions & SocketOptions> | undefined): Socket => {
	const socket = useRef(io(url, options)).current;

	useEffect(() => {
		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, [socket]);

	return socket;
};

export default useSocket
