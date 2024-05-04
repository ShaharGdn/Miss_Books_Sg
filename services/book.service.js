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
    getDefaultFilter,
    getSpeedStats,
    getVendorStats,
    _setNextPrevBookId,
    _getBookCountByVendorMap
}
// For Debug (easy access from console):
// window.cs = bookService

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

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextprevBookId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptybook(vendor = '', maxSpeed = '') {
    return { vendor, maxSpeed }
}

function getDefaultFilter(filterBy = { title: '', maxPrice: 0 }) {
    return { title: filterBy.title, maxPrice: filterBy.maxPrice }
}

function getSpeedStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountBySpeedMap = _getbookCountBySpeedMap(books)
            const data = Object.keys(bookCountBySpeedMap).map(speedName => ({ title: speedName, value: bookCountBySpeedMap[speedName] }))
            return data
        })

}

function getVendorStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByVendorMap = _getbookCountByVendorMap(books)
            const data = Object.keys(bookCountByVendorMap)
                .map(vendor =>
                ({
                    title: vendor,
                    value: Math.round((bookCountByVendorMap[vendor] / books.length) * 100)
                }))
            return data
        })
}

function _createbooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const vendors = ['audu', 'fiak', 'subali', 'mitsu']
        for (let i = 0; i < 6; i++) {
            const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
            books.push(_createbook(vendor, utilService.getRandomIntInclusive(80, 300)))
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createbook(vendor, maxSpeed = 250) {
    const book = getEmptybook(vendor, maxSpeed)
    book.id = utilService.makeId()
    return book
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _getBookCountBySpeedMap(books) {
    const bookCountBySpeedMap = books.reduce((map, book) => {
        if (book.maxSpeed < 120) map.slow++
        else if (book.maxSpeed < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return bookCountBySpeedMap
}

function _getBookCountByVendorMap(books) {
    const bookCountByVendorMap = books.reduce((map, book) => {
        if (!map[book.vendor]) map[book.vendor] = 0
        map[book.vendor]++
        return map
    }, {})
    return bookCountByVendorMap
}