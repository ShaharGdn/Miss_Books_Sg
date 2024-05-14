import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDB'
_createbooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptybook,
    _createbooks,
    _createbook,
    getDefaultFilter,
    getSpeedStats,
    getVendorStats,
    _setNextPrevBookId,
}
// For Debug (easy access from console):
window.cs = bookService


// get the books from ls then filter by .... using filter. return the books
function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })
}

// using the async service get function to get a specific book and adding next prev on the book obj. return the book
function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

// using the storage service remove with the book key and ID
function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

// depending on whether we have a book.id we will decide if using put or post from storage service 
function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

// an empty book obj template
function getEmptybook() {
    const book = {
        id: '',
        title : '',
        subtitle: '',
        authors : '',
        price: '',
        publishedDate: '',
        description: '',
        pageCount: '',
        categories: '',
        thumbnail: `http://coding-academy.org/books-photos/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
        language: '',
        listPrice: {
            amount: '',
            currencyCode: '',
            isOnSale: Math.random() > 0.7
        }
    }
    return book
}

// an empty filter to initialize the filter settings
function getDefaultFilter(filterBy = { title: '', maxPrice: 0 }) {
    return { title: filterBy.title, maxPrice: filterBy.maxPrice }
}

// create 19 random books. save to storage
function _createbooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [utilService.makeLorem(1)],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en", 
                price: utilService.getRandomIntInclusive(80, 500),
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
    return books
}

// create a single book
function _createbook() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

    const book = {
        id: utilService.makeId(),
        title : utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors : [utilService.makeLorem(1)],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `http://coding-academy.org/books-photos/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
        language: 'Unknown',
        price: utilService.getRandomIntInclusive(80, 500),
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
    return book
}

// set next prev book id
function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}