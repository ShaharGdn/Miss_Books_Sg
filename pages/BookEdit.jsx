const { useRef, useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

export function BookEdit() {
    const currRef = useRef(null)
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
            .then(() => navigate('/book'))
            .catch(() => {
                alert('Couldnt save')
                navigate('/book')
            })
    }

    return (
        <dialog ref={currRef} open type="modal" className="bookEdit">
            <span>{book ? book.title : 'New Book'}</span>
            <form onSubmit={onSave}>
                <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" value={book.price} onChange={handleChange} />
                <input type="text" name="authors" placeholder="Author" value={book.authors} onChange={handleChange} />
                <input type="number" name="pageCount" placeholder="Pages" value={book.pageCount} onChange={handleChange} />
                <input type="number" name="publishedDate" placeholder="Published (YYYY)" value={book.publishedDate} onChange={handleChange} />
                <input type="text" name="language" placeholder="Language" value={book.language} onChange={handleChange} />
                <button>Add</button>
            </form>
            <Link to="/book"><button>x</button></Link>
        </dialog>
    )
}
