const {
    addBook,
    getAllBooks
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
];

module.exports = routes;