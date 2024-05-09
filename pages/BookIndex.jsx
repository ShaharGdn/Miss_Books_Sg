const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { storageService } from "../services/async-storage.service.js"

import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookEdit } from "./BookEdit.jsx"

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

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
            .then(() => setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    }

    function addBook(newBook) {
        storageService.post('booksDB', newBook)
            .then(book => setBooks(prevBooks => [...prevBooks, book]))
    }


    function showBookDetails(book) {
        setSelectedBook(book)
    }

    return <section className="books">
        <Link to="/book/edit"><button>Add a Book</button></Link>

        <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
        <BookList books={books} onRemove={removeBook}/>
        {/* {!selectedBook && !isAddEdit && <h1>Books</h1>}
        {!selectedBook && !isAddEdit && <button onClick={onAddEditBook}>Add Book</button>}
        {!isAddEdit && !selectedBook && <BookFilter filterBy={filterBy} onFilter={onSetFilterBy} />}
        {!selectedBook && !isAddEdit && <BookList books={books} onRemove={removeBook} onShowDetails={showBookDetails} />}
        {selectedBook && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />}
        {isAddEdit && <BookEdit onAddBook={onAddBook} onClose={() => setEditor(false)} />} */}
    </section>
}