import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {

    return <section className="book-list">
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Author</th>
                    <th>Thumbnail</th>
                </tr>
                {<BookPreview books={books}/>}
                {/* {books.map(book => {
                        return  <tr>
                            <td>{book.title}</td>
                            <td>{book.listPrice.amount}</td>
                            <td>{book.authors}</td>
                            <td><img src={book.thumbnail}/></td>
                        </tr>
                    })} */}
            </thead>
        </table>
    </section>
}