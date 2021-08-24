const http = require("http");
const config = require("config");
const server = http.createServer(require("../app"));

const port = config.get("app.port");

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
