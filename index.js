const http = require('http');
const { WebSocketServer } = require('ws');
const wisp = require('@clovergaze/wisp-server-node');

// Creiamo un server HTTP standard che risponda su qualsiasi richiesta
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servizio Wisp attivo.');
});

// Colleghiamo i WebSocket direttamente al server HTTP principale
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wisp.handleConnection(ws);
    });
});

// Fondamentale per Render: accetta la porta dinamica assegnata o la 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
