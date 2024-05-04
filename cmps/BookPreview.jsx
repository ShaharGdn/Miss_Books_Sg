export function BookPreview({ books, onRemove, onShowDetails }) {
    {
        return books.map(book => {
            return <tr>
                <td>{book.title}</td>
                <td>{book.listPrice.amount}</td>
                <td>{book.authors}</td>
                <td>
                    <img src={book.thumbnail} />
                </td>
                <td>
                    <button onClick={() => onRemove(book.id)}>x</button>
                </td>
                <td>
                    <button onClick={() => onShowDetails(book)}>Details</button>
                </td>
            </tr>
        })
    }
}
