const express = require("express");
const app = express();

const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");

app.get("/check/:zip", 
    validateZip,
    (req, res, next) => {
        const { zip } = req.params;
        const zoo = getZoos(zip);
        if (zoo && zoo.length) {
            const message = `${zip} exists in our records.`;
            res.send(message);
        } else {
            next(`${zip} does not exist in our records.`)
        }
});

app.get('/zoos/all', (req, res, next) => { // https://darics-server.com/zoos/all?admin=true
    const { admin } = req.query;
    if (admin && admin === 'true') {
        const zoos = getZoos('all');
        res.send(`All zoos: ${zoos.join('; ')}`);
    } else {
        res.send(`You do not have access to that route.`);
    }
});

app.get('/zoos/:zip',
    validateZip,
    (req, res, next) => {
        const { zip } = req.params;
        const zoo = getZoos(zip);
        if (zoo && zoo.length) {
            const message = `${zip} zoos: ${zoo.join('; ')}`;
            res.send(message);
        } else {
            next(`${zip} has no zoos.`)
        }
});

// Not-found handler
app.use((req, res, next) => {
    res.send(`That route could not be found!`);
});

// error handler 
app.use((err, req, res, next) => {
    console.error(err);
    res.send(err);
});


module.exports = app;