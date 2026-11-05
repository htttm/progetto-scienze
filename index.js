const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { wisp } = require('@clovergaze/wisp-server-node');

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servizio di rete attivo.');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
    if (req.url === '/') {
        wisp.handleConnection(ws);
    } else {
        ws.close();
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server attivo sulla porta ${PORT}`);
});
