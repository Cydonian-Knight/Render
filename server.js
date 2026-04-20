// server.js
const express = require("express");
const app = express();

const http = require("http");
const WebSocket = require("ws");

app.use(express.static("public"));

// Crear servidor HTTP
const server = http.createServer(app);

// WebSocket sobre el mismo server
const wss = new WebSocket.Server({ server });

// Puerto Render o local
const PORT = process.env.PORT || 3002;

wss.on("connection", (socket) => {
    console.log("Cliente conectado");

    socket.send("Conectado al chat");

    socket.on("message", (mensaje) => {
        const texto = mensaje.toString();

        console.log("Mensaje:", texto);

        // reenviar a todos
        wss.clients.forEach((cliente) => {
            if (cliente.readyState === WebSocket.OPEN) {
                cliente.send(texto);
            }
        });
    });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor iniciado en puerto " + PORT);
});
