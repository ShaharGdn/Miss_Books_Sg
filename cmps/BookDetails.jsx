import { bookService } from "../services/book.service.js"
import { LongTxt } from "./LongTxt.jsx"

const { useState, useEffect } = React

export function BookDetails({ book, onClose }) {
    const currYear = (new Date()).getFullYear()
    const yearsDiff = currYear - book.publishedDate
    

    function textLengthTags() {
        return book.pageCount > 500 ? 'Serious Reading'
            : book.pageCount > 200 ? 'Descent Reading'
                : 'Light Reading'
    }

    function bookPriceColor() {
        return book.listPrice.amount < 20  ? 'green'
        : book.listPrice.amount > 150 ? 'red'
            : 'black'
    }

    return <section className="book-details">
        <h3>Title: {book.title}</h3>
        <h4>Subtitle: {book.subtitle}</h4>
        {book.listPrice.isOnSale && <p className="on-sale">on Sale!</p>}
        <p>{textLengthTags()}</p>
        <p>By: {book.authors} ,{book.publishedDate}</p>
        {yearsDiff > 10 && <p>Vintage</p>}
        {yearsDiff < 1 && <p>New</p>}
        <p>Categories: {book.categories.map(category => <span>{category} </span>)}</p>
        <p style={{ color: bookPriceColor() }}><span style={{ color: 'black' }}>Price: </span>{book.listPrice.amount} {book.listPrice.currencyCode}</p>
        <p>Pages: {book.pageCount}</p>
        <p>Language: {book.language}</p>
        {<LongTxt txt={book.description} />}
        <img src={book.thumbnail} alt="" />
        <button onClick={onClose}>x</button>
    </section>
}