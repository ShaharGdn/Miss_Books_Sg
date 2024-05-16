import { GoogleBooksList } from "../cmps/google-books-list.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { googleService } from "../services/google-books.service.js"

const { useNavigate } = ReactRouter

const { useState, useEffect } = React

export function GoogleBookAdd() {
    const [books, setBooks] = useState(null)
    const [term, setSearchTerm] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        googleService.getGoogleBooks(term)
            .then(books => setBooks(books))
    }, [term])

    if (!books) return

    function handleChange({ target }) {
        console.log('target.value:', target.value)
        setSearchTerm(target.value)
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

    function debounce(func, wait = 1500) {
        console.log('func:', func)
        let timeout
    
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    }

    return <section>
        <label htmlFor="search">Search: </label><input
            autoFocus={true}
            type="search"
            id="search"
            placeholder="Harry Potter"
            onChange={handleChange} />
        {term ? <h1>Results</h1> : <h1>Search Something...</h1>}
        {term && <GoogleBooksList books={books} onChooseBook={onSave} />}
    </section >
}