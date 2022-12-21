const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);