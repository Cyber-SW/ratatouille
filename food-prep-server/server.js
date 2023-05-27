const app = require("./app");

// Server port
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
