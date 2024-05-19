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

    function debounce(func, wait = 5000) {
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

    return <section className="google-add-book">
        <h1>Add A Book From Google API</h1>
        <section className="google-search">
            <label htmlFor="search">Search: </label><input
                autoFocus={true}
                type="search"
                id="search"
                placeholder="Harry Potter"
                onChange={debounce((ev) => handleChange(ev))} />
        </section >
        {!term && <h2>Search Something...</h2>}
        {term && <GoogleBooksList books={books} onChooseBook={onSave} />}
    </section>
}


