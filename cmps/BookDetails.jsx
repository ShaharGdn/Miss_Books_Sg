export function BookDetails({ book, onClose }) {
    return <section className="book-details">
        <h3>Title: {book.title}</h3>        
        <h4>Subtitle: {book.subtitle}</h4>        
        <p>{book.authors} ,{book.publishedDate}</p>   
        <p>Categories: {book.categories.map(category => <span>{category} </span>)}</p>        
        <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>        
        <p>Pages: {book.pageCount}</p>        
        <p>Language: {book.language}</p>        
        <img src={book.thumbnail} alt="" />
        <button onClick={onClose}>x</button>
    </section>
}