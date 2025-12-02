const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Cartella pubblica
app.use(express.static("public"));

// Pagina principale
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// WebSocket
io.on("connection", (socket) => {
    console.log("Utente collegato");

    socket.on("chat_message", (msg) => {
        io.emit("chat_message", msg);
    });

    socket.on("disconnect", () => {
        console.log("Utente disconnesso");
    });
});

// Porta (Render usa process.env.PORT)
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`FRIEND APP avviato su porta ${PORT}`));
