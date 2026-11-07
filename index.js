const http = require('http');
const { WebSocketServer } = require('ws');
const wisp = require('wisp-server-node');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servizio Wisp attivo.');
});

const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wisp.handleConnection(ws);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
