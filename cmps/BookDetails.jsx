import { bookService } from "../services/book.service.js"
import { LongTxt } from "./LongTxt.jsx"

const { useState, useEffect } = React

export function BookDetails({ book, onClose }) {
    function textLengthTags() {
        return book.pageCount > 500 ? 'Serious Reading'
            : book.pageCount > 200 ? 'Descent Reading'
                : 'Light Reading'
    }

    return <section className="book-details">
        <h3>Title: {book.title}</h3>
        <h4>Subtitle: {book.subtitle}</h4>
        <p>{textLengthTags()}</p>
        <p>{book.authors} ,{book.publishedDate}</p>
        <p>Categories: {book.categories.map(category => <span>{category} </span>)}</p>
        {book.listPrice.isOnSale && <span className="on-sale">on Sale!</span>}
        <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
        <p>Pages: {book.pageCount}</p>
        <p>Language: {book.language}</p>
        {<LongTxt txt={book.description} />}
        <img src={book.thumbnail} alt="" />
        <button onClick={onClose}>x</button>
    </section>
}