export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h3 className="title">{book.title}</h3>
            <div className="content">
                <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
                <p>By: {book.authors}</p>
                <p>Description: {book.description.substring(0, 20)}...</p>
                <img src={book.thumbnail} alt="thumbnail of a book" />
            </div>
        </article>
    )
}
