export function BookDetails({ book, onClose }) {
    return <section className="book-details">
        <h3>{book.title}</h3>        
        <p>{book.author}</p>        
        <img src={book.thumbnail} alt="" />
        <button onClick={onClose}>x</button>
    </section>
}