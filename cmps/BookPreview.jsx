import { bookService } from "../services/book.service.js"

export function BookPreview({ book }) {
    return <article className="book-preview">
        <h3>{book.title}</h3>
        <span>{book.listPrice.amount} {book.listPrice.currencyCode}</span>
        <span>{book.authors}</span>
        <p>{book.description}</p>
        <img src={book.thumbnail} alt="thumbnail of a book" />
    </article>
}   