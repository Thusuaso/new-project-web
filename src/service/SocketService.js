import io from "socket.io-client";

const socket = {
  siparis : io.connect('http://localhost:5001'),
  //siparis: io("https://doktor-socket.mekmar.com"),
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export default socket;
