import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemove, onShowDetails}) {
    return <section className="book-list">
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Author</th>
                    <th>Thumbnail</th>
                    <th>Delete</th>
                    <th>Details</th>
                </tr>
                {<BookPreview books={books} onRemove={onRemove} onShowDetails={onShowDetails}/>}
            </thead>
        </table>
    </section>
}