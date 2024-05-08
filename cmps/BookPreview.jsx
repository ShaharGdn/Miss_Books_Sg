import { LongTxt } from "./LongTxt.jsx"

export function BookPreview({ book }) {
    return <article className="book-preview">
        <h3>{book.title}</h3>
        <span>{book.listPrice.amount} {book.listPrice.currencyCode}</span>
        <span>{book.authors}</span>
        <span>{<LongTxt length={50} txt={book.description} />}</span>
        <img src={book.thumbnail} alt="thumbnail of a book" />
    </article>
}   