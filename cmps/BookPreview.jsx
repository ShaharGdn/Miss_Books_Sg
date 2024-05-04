export function BookPreview({ books }) {
    {
        return books.map(book => {
            return <tr>
                <td>{book.title}</td>
                <td>{book.listPrice.amount}</td>
                <td>{book.authors}</td>
                <td><img src={book.thumbnail} /></td>
            </tr>
        })
    }
}
