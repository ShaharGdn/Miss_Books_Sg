const { useRef, useState } = React

import { bookService } from "../services/book.service.js"

export function BookAddEdit({ book = null, onClose, onAddBook }) {
    const currRef = useRef(null)
    const [formData, setFormData] = useState(bookService.getEmptybook())

    function handleInputChange(event) {
        const { name, value } = event.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleNewBook(event) {
        event.preventDefault()
        onAddBook(formData)
        currRef.current.close()
        onClose()
    }

    return (
        <dialog ref={currRef} open type="modal" className="bookAddEdit">
            <span>{book ? book.title : 'New Book'}</span>
            <form onSubmit={handleNewBook}>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                <input type="text" name="authors" placeholder="Author" value={formData.authors} onChange={handleInputChange} />
                <input type="number" name="pageCount" placeholder="Pages" value={formData.pageCount} onChange={handleInputChange} />
                <input type="number" name="publishDate" placeholder="Published (YYYY)" value={formData.publishDate} onChange={handleInputChange} />
                <input type="text" name="language" placeholder="Language" value={formData.language} onChange={handleInputChange} />
                <button>Add</button>
            </form>
            <button onClick={() => {
                currRef.current.close()
                onClose()
            }}>Close</button>
        </dialog>
    )
}
