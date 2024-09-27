const http = require('http');
const url = require('url');

const users = [
    {
        name: "Bhagirath",
        email: "bhagirath@gmail.com"
    },
    {
        name: "Divya",
        email: "divya@gmail.com"
    },
    {
        name: "Raj",
        email: "raj@up.com"
    }
];
const products = [
    {
        name: "Product1",
        price: 100,
        rating: 4.5
    },
    {
        name: "Product2",
        price: 250,
        rating: 1.3
    },
    {
        name: "Product3",
        price: 500,
        rating: 4.6
    }
];
const category = [
    {
        name: "Mobile Phone",
        slug: "mobile-phone"
    },
    {
        name: "Laptop",
        slug: "laptop"
    }
];

const server = http.createServer(
    (req, res) => {
        const parsedUrl = url.parse(req.url, true); // Convert URL to Parsed URL
        if (parsedUrl.pathname == "/user") {
            res.end(JSON.stringify(users));
        } else if (parsedUrl.pathname == "/product") {
            res.end(JSON.stringify(products));
        } else if (parsedUrl.pathname == "/category") {
            res.end(JSON.stringify(category))
        } else {
            res.end("Not found");
        }
    }
)

server.listen(
    5000,
    () => {
        console.log('Server started');
    }
)