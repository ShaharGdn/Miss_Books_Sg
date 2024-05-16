import { BookPreview } from "./book-preview.jsx"

export function GoogleBooksList({ books, onChooseBook }) {
    return <section className="book-list">
        <ul>
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section className="action">
                        <button onClick={()=> onChooseBook(book)}>Add Book</button>
                    </section>
                </li>)}
        </ul>
    </section>
}