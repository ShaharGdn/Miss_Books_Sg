const { useRef, useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptybook())

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.bookId) return

        bookService.get(params.bookId)
            .then(setBook)
    }, [])

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        if (prop === 'price') {
            setBook(prevBook => ({
                ...prevBook,
                listPrice: {
                    ...prevBook.listPrice,
                    amount: value
                }
            }))
        }

        setBook(prevBook => ({ ...prevBook, [prop]: value }))
    }

    function onSave(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => {
                navigate('/book')
                showSuccessMsg(`Successfully Added book ${book.id}!`)
            })
            .catch((err) => {
                console.log('err:', err)
                showErrorMsg(err)
                navigate('/book')
            })
    }

    return (
        <section className="book-edit">
            <span className="title">{book ? 'Edit: ' + book.title : 'New Book'}</span>
            <form onSubmit={onSave}>
                <label htmlFor="title">Title: </label><input id="title" type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} />
                <label htmlFor="price">Price: </label><input type="number" id="price" name="price" placeholder="Price" value={book.price} onChange={handleChange} />
                <label htmlFor="authors">Authors: </label><input type="text" id="authors" name="authors" placeholder="Author" value={book.authors} onChange={handleChange} />
                <label htmlFor="pages">Pages: </label><input type="number" id="pages" name="pageCount" placeholder="Pages" value={book.pageCount} onChange={handleChange} />
                <label htmlFor="year">Published: </label><input type="number" id="year" name="publishedDate" placeholder="Published (YYYY)" value={book.publishedDate} onChange={handleChange} />
                <label htmlFor="lang">Language: </label><input type="text" id="lang" name="language" placeholder="Language" value={book.language} onChange={handleChange} />
                <section className="actions">
                    <button>Save</button>
                    <Link to="/book"><button>Exit</button></Link>
                </section>
            </form>
        </section>
    )
}
