console.log('=== Web App ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('BASE_URL:', process.env.BASE_URL);
console.log('PORT:', process.env.PORT);
console.log('APP_NAME:', process.env.APP_NAME);
console.log('WEB_SECRET:', process.env.WEB_SECRET || 'not set');

const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Web app running on port ${port}\n`);
});

server.listen(port, () => {
  console.log(`\nWeb server listening on port ${port}`);
});