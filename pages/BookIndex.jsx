const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

export function BookIndex() {
    const demo = [
        {
            id: utilService.makeId(),
            title: "Hope, Faith & Courage",
            description: "Hope, Faith & Courage Vol. II is now available as an eBook on most eBook retail websites.",
            thumbnail: "https://ca.org/content/uploads/2015/05/HFC2.png",
            listPrice: {
                amount: 12.99,
                currencyCode: "USD",
                isOnSale: false
            },
            subtitle: "L’Espoir, la Foi et le Courage",
            authors: ["Barbara Cartland"],
            publishedDate: 1997,
            pageCount: 713,
            categories: ["Motivation", "Biography"],
            language: "en"
        },
        {
            id: utilService.makeId(),
            title: "Shares That Grow",
            description: "Shares that Grow introduces a new index for quick evaluation of relative value of investment grade quoted shares. The data that it uses is based on current media publication of ratios etc.",
            thumbnail: "https://www.junkybooks.com/administrator/bookimages/659fbc35755d44.68576706.jpg",
            listPrice: {
                amount: 7.99,
                currencyCode: "USD",
                isOnSale: true
            },
            subtitle: "mi est eros dapibus himenaeos",
            authors: ["Esther Schwartz"],
            publishedDate: 1999,
            pageCount: 412,
            categories: ["Stocks", "Finance"],
            language: "en"
        },
        {
            id: utilService.makeId(),
            title: "Greening IT",
            description: "Greening IT is an interntionally collaborative, non-profit, creative commons licensed book dedicated to the preservation of the most important resource - planet earth itself.",
            thumbnail: "https://www.junkybooks.com/administrator/bookimages/66085c36239cb9.48539951.jpg",
            listPrice: {
                amount: 4.99,
                currencyCode: "USD",
                isOnSale: false
            },
            subtitle: "Low-Carbon society - Information and Communication Technology (ICT).",
            authors: ["Jade Band"],
            publishedDate: 2012,
            pageCount: 390,
            categories: ["Gardening", "Home"],
            language: "en"
        }
    ]
    // utilService.saveToStorage('booksDB', demo)

    const [ books, setBooks ] = useState(demo)
    const [ filterBy, setFilterBy ] = useState(bookService.getDefaultFilter())
    const [ selectedBook, setSelectedBook ] = useState(null)

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    }


    function showBookDetails(book) {
        setSelectedBook(book)
    }

    return <section className="books">
        <h1>Books</h1>

        <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
        {!selectedBook && <BookList books={books} onRemove={removeBook} onShowDetails={showBookDetails}/>}
        {selectedBook && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </section>
}