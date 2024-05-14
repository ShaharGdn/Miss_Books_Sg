const { Link } = ReactRouterDOM

import { BookPreview } from "./book-preview.jsx";

export function BookList({ books, onRemove }) {
    return <section className="book-list">
        <ul>
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section className="action">
                        <Link to={`/book/${book.id}`}><button>Details</button></Link>
                        <Link to={`/book/edit/${book.id}`}><button>Edit</button></Link>
                        <a href="#"><button onClick={() => onRemove(book.id)}>Delete</button></a>
                    </section>
                </li>)}
        </ul>
    </section>
}