// import { io, Socket } from "socket.io-client";

// const URL: string | undefined =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

// export const socket: Socket = URL ? io(URL) : io();
import { io, Socket } from "socket.io-client";

export const socket: Socket = io("http://localhost:3000");
