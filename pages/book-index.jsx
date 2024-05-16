const { useState, useEffect } = React
const { useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

import { BookList } from "../cmps/book-list.jsx"
import { BookFilter } from "../cmps/book-filter.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    const navigate = useNavigate()

    useEffect(() => {
        bookService.query()
            .then(books => setBooks(books))
    }, [])

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg(`Successfully removed book ${bookId}!`)
                navigate('/book', { replace: true })
            })
    }

    function onSave(book) {
        googleService.save(book)
            .then(() => {
                navigate('/book')
                showSuccessMsg(`Successfully Added book ${book.id}!`)
            })
            .catch((err) => {
                showErrorMsg(err)
                navigate('/book')
            })
    }

    return <section className="books">
        <BookFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        <Link to="/book/add"><button>Add a Book</button></Link>

        <BookList books={books} onRemove={removeBook} />
    </section>
}