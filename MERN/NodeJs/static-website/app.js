const express = require('express');
const { readFileSync, existsSync, mkdirSync } = require('fs');

const server = express();
server.use(express.json()); // to enable the use of object and json
// middleware
server.get(
    "/",
    (req, res) => {
        const page = readFileSync("pages/home.html");
        res.end(page);
    }
)

server.get(
    "/about",
    (req, res) => {
        const page = readFileSync("pages/about.html");
        res.end(page);
    }
)
server.get(
    "/service",
    (req, res) => {
        const page = readFileSync("pages/services.html");
        res.end(page);
    }
)

server.post(
    "/folder",
    (req, res) => {
        const data = req.body;
        try {
            if (data.folder) {
                if (existsSync(data.folder)) {
                    res.send(
                        {
                            msg: "The folder name already exists",
                            status: 0
                        }
                    )
                } else {
                    mkdirSync(data.folder);
                    res.send(
                        {
                            msg: "Folder created",
                            status: 1
                        }
                    )
                }
            } else {

            }
        } catch (err) {

        }
    }
)

server.listen(
    5000,
    () => {
        console.log('Server started');
    }
)