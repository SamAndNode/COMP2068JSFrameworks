const connect = require('connect');
const url = require('url');

function calculate(urlString) {
    const parsedUrl = new URL(urlString);

    const method = parsedUrl.searchParams.get('method');
    const x = parseFloat(parsedUrl.searchParams.get('x'));
    const y = parseFloat(parsedUrl.searchParams.get('y'));

    let result;

    switch(method) {
        case 'add':
            result = x + y;
            break;
        case 'subtract':
            result = x - y;
            break;
        case 'multiply':
            result = x * y;
            break;
        case 'divide':
            result = x / y;
            break;
        default:
            return "Error: Invalid method";
    }

    return `${x} ${method} ${y} = ${result}`;
}

const app = connect();

app.use((req, res) => {
    const urlString = req.url;
    const result = calculate(urlString);

    res.setHeader('Content-Type', 'text/plain');
    res.end(result);
});

const PORT = 3009;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
