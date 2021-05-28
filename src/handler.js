const { nanoid } = require('nanoid');
const books = require('./books');

const addBook = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;

    if (pageCount === readPage) {
        finished = true;
    };

    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });

        response.code(400);
        return response;
    };
    
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });

        response.code(400);
        return response;
    };

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });

        response.code(201);
        return response;
    };

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan'
    });
    response.code(500);
    return response;
};

const getAllBooks = (request, h) => {
    let arrBooks = books;
    const filterBooks = [];
    const result = [];
    const { reading, finished, name: nameBooks } = request.query;

    if (nameBooks) {
        const strRegex = new RegExp(`\\b${nameBooks}\\b`, 'gi');
        books.forEach((book) => {
            if (book.name.match(strRegex)) {
                filterBooks.push(book);
            };
        });
        arrBooks = filterBooks;
    ;}

    if (reading !== undefined) {
        if (reading === '1') {
            books.forEach((book) => {
                if (book.reading) {
                    filterBooks.push(book);
                };
            });
            arrBooks = filterBooks;
        } else if (reading === '0') {
            books.forEach((book) => {
                if (!book.reading) {
                    filterBooks.push(book);
                };
            });
            arrBooks = filterBooks;
        };
    };

    if (finished !== undefined) {
        if (finished === '1') {
            books.forEach((book) => {
                if (book.finished) {
                    filterBooks.push(book);
                };
            });
            arrBooks = filterBooks;
        } else if (finished === '0') {
            books.forEach((book) => {
                if (!book.finished) {
                    filterBooks.push(book);
                };
            });
            arrBooks = filterBooks;
        };
    };

    if (arrBooks) {
        arrBooks.forEach((book) => {
            const { id, name, publisher } = book;
            result.push({ id, name, publisher });
        });
    };

    const response = h.response({
        status: 'success',
        data: {
            books: result,
        },
    });
    response.code(200);
    return response;
};

module.exports = {
    addBook,
    getAllBooks,
};