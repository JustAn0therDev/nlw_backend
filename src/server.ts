import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    let { name } = request.query;

    response.json({ success: true, message: `hello TypeScript! Your name is: ${name}` });
});


app.listen(3333);