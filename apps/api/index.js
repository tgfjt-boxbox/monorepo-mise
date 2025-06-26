console.log('=== API Server ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('BASE_URL:', process.env.BASE_URL);
console.log('PORT:', process.env.PORT);
console.log('APP_NAME:', process.env.APP_NAME);
console.log('API_KEY:', process.env.API_KEY || 'not set');

const http = require('http');
const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'API running', port }));
});

server.listen(port, () => {
  console.log(`\nAPI server listening on port ${port}`);
});