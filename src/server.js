const express = require("express");
const app = express();
app.use(express.json())

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);