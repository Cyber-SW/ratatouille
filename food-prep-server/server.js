const app = require("./app");

//server port
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
