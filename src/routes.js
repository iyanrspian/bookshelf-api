const {
    addBook,
    getAllBooks,
    getBookByID,
    updateBookByID,
    delBookByID,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByID,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookByID,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: delBookByID,
    },
];

module.exports = routes;