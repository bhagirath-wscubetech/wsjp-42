const http = require('http');
const url = require('url');
const { readFileSync, mkdirSync, existsSync } = require('fs');

const server = http.createServer(
    (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        let page = "";
        if (parsedUrl.pathname == "/") {
            page = readFileSync('pages/home.html');
            res.end(page);
        } else if (parsedUrl.pathname == "/about") {
            page = readFileSync('pages/about.html');
            res.end(page);
        } else if (parsedUrl.pathname == "/service") {
            page = readFileSync('pages/services.html');
            res.end(page);
        } else if (parsedUrl.pathname == "/folder" && req.method == "POST") {
            try {
                req.on(
                    "data",
                    (chunk) => {
                        const data = JSON.parse(chunk.toString());
                        if (data.folder != undefined || data.folder != "") {
                            if (existsSync(data.folder)) {
                                return res.end(
                                    JSON.stringify(
                                        {
                                            msg: "The folder name already exists",
                                            status: 0
                                        }
                                    )
                                )
                            } else {
                                mkdirSync(data.folder);
                                return res.end(
                                    JSON.stringify(
                                        {
                                            msg: "Folder created",
                                            status: 1
                                        }
                                    )
                                )
                            }
                        } else {
                            return res.end(
                                JSON.stringify(
                                    {
                                        msg: "Please enter a folder name",
                                        status: 0
                                    }
                                )
                            )
                        }

                    }
                )
            }
            catch (err) {
                return res.end(
                    JSON.stringify(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                )
            }

        }

    }
)


server.listen(5000, () => console.log('Server started'));