import { io } from "socket.io-client";
const socket = {
 // siparis: io('http://localhost:5001',{ origins: '*:*'}),

  siparis: io('https://doktor-socket.mekmar.com',{ origins: '*:*'}),
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export default socket;
