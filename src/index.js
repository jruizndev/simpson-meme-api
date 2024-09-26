const app = require('./app/App.js')

const port = process.env.port || 3001;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})