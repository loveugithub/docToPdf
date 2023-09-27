const dotenv = require("dotenv");
dotenv.config({ path: "src/.env" });

const express = require("express");

const api = require("./routes/api");

const app = express();
app.use(express.json());
app.use("/api/v1", api);
const PORT = process.env.PORT || 3000;
console.log("PORT ", PORT);

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
