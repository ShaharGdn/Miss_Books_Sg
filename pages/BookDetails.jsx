const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import { LongTxt } from "../cmps/long-txt.jsx"
import { bookService } from "../services/book.service.js"

export function BookDetails() {
    const [ book, setBook ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => {
                setBook(book)
            })
            .catch(() => {
                alert('Couldnt get book...')
                navigate('/book')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.bookId])

    if (!book) return
    
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

    if(isLoading) return <h3>Loading...</h3>
    return <section className="book-details">
        <h3>Title: {book.title}</h3><br />
        <h4>Subtitle: {book.subtitle}</h4><br />
        {book.listPrice.isOnSale && <p style={{fontWeight: 800}} className="on-sale">on Sale!</p>}
        <p style={{fontWeight: 800}}>{textLengthTags()}</p>
        {yearsDiff > 10 && <p style={{fontWeight: 800}} >Vintage</p>}
        <p>By: {book.authors} ,{book.publishedDate}</p>
        {yearsDiff < 1 && <p>New</p>}
        <p>Categories: {book.categories.map(category => <span>{category} </span>)}</p>
        <p style={{ color: bookPriceColor() }}><span style={{ color: 'black' }}>Price: </span>{book.price} {book.listPrice.currencyCode}</p>
        <p>Pages: {book.pageCount}</p>
        <p>Language: {book.language}</p>
        {<LongTxt txt={book.description} />}
        <img src={book.thumbnail} alt="" />

        <section className="actions">
            <Link to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
            <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
            <Link to="/book"><button>x</button></Link>
        </section>
    </section>
}