const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const FILE = path.join(__dirname, 'site_with_chat.html');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  fs.readFile(FILE, (err, data) => {
    if (err) { res.writeHead(404); res.end('File not found'); return; }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
