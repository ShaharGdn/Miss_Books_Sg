import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const BOOK_KEY = 'booksDB'

export const googleService = {
    getGoogleBooks,
    save,
}

function getGoogleBooks(term) {
    const key = `${term}INFO`

    var booksCache = utilService.loadFromStorage(key)

    if (booksCache) return Promise.resolve(_createbooks(booksCache))

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${term}`

    return axios.get(url)
        .then(response => {
            booksCache = response.data.items
            utilService.saveToStorage(key, booksCache)
            const booksList = _createbooks(booksCache)
            return booksList
        })
}

function _createbooks(books) {
    const booksList = books.map((book) => {
        const { id, volumeInfo } = book
        const { authors, categories, description, imageLinks, language, publishedDate, pageCount, title, subtitle } = volumeInfo
        const { thumbnail } = imageLinks
        return {
            id,
            title,
            subtitle,
            authors,
            publishedDate,
            description,
            pageCount,
            categories,
            thumbnail,
            language,
            price: utilService.getRandomIntInclusive(80, 500),
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            },
            reviews: [],
        }
    })
    return booksList
}

function save(book) {
    return storageService.post(BOOK_KEY, book)
}