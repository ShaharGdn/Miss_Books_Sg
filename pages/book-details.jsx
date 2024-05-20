const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import { LongTxt } from "../cmps/long-txt.jsx"
import { AddReview } from "../cmps/review-add.jsx"
import { ReviewList } from "../cmps/review-list.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { googleService } from "../services/google-books.service.js"
import { utilService } from "../services/util.service.js"

export function BookDetails() {
    googleService.getGoogleBooks('lala')

    const [book, setBook] = useState(null)
    const [isAddReview, setReviewEditor] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

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

    const {
        thumbnail,
        title,
        subtitle,
        pageCount,
        publishedDate,
        description,
        authors,
        categories,
        language,
        reviews,
        listPrice,
        price,
        prevBookId,
        nextBookId,
    } = book

    const { currencyCode, amount } = listPrice

    const currYear = (new Date()).getFullYear()
    const yearsDiff = currYear - book.publishedDate

    function onToggleReviewModal() {
        setReviewEditor(prevState => !prevState)
    }

    function onSaveReview(review) {
        bookService.saveReview(book.id, review)
            .then((review) => {
                const reviews = [review, ...book.reviews]
                setBook({ ...book, reviews })
            })
            .catch(() => {
                showErrorMsg(`Review to ${book.title} Failed!`, book.id)
            })
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId)
            .then(() => {
                setBook({ ...book, reviews: book.reviews.filter(review => review.id !== reviewId) })
            })
            .catch(() => {
                showErrorMsg(`Deleting review ${reviewId} Failed!`)
            })
    }

    function textLengthTags() {
        return pageCount > 500 ? 'Serious Reading'
            : pageCount > 200 ? 'Descent Reading'
                : 'Light Reading'
    }

    function bookPriceColor() {
        return listPrice.amount < 20 ? 'green'
            : listPrice.amount > 150 ? 'red'
                : 'black'
    }

    function getBookAge() {
        if (yearsDiff > 10) {
            return <span style={{ fontWeight: 800 }} >Vintage</span>
        } else if (yearsDiff < 1) return <span>New</span>
    }

    if (isLoading) return <h3>Loading...</h3>

    return <section className="book-details">
        <article>
            <h3>{title}</h3>
            <p className="capital"><span className="label">Subtitle: </span>{subtitle}</p>
            <p style={{ fontWeight: 800 }}>{textLengthTags()}</p>
            <p className="capital"><span className="label">By: </span>{authors} ,{publishedDate} {getBookAge()}</p>
            <p><span className="label">Categories: </span> {categories.map(category => <span key={utilService.makeId()}>{category} </span>)}</p>
            <p style={{ color: bookPriceColor() }}><span className="label">Price: </span>
                <span style={{ color: 'black' }}></span>{price}{utilService.getCurrencySign(currencyCode) } 
                {listPrice.isOnSale && <span className="on-sale"> On Sale!</span>}
            </p>
            <p><span className="label">Pages: </span>{pageCount}</p>
            <p><span className="label">Language:  </span>{language}</p>
            {<LongTxt txt={description} />}
        </article>
        <img src={thumbnail} alt="" />

        <section className="actions">
            <Link to={`/book/${prevBookId}`}><button>Prev</button></Link>
            <Link to={`/book/${nextBookId}`}><button>Next</button></Link>

            <button onClick={onToggleReviewModal}>Add a review</button>
            {isAddReview && < AddReview onSaveReview={onSaveReview} onToggleReviewModal={onToggleReviewModal} />}
            <Link to="/book"><button>x</button></Link>
        </section>
        <div className='review-container'>
            <ReviewList
                reviews={reviews}
                onRemoveReview={onRemoveReview}
            />
        </div>
    </section>
}