import { StarRating } from "./star-rating"

export function ReviewList({ reviews, onRemoveReview }) {
    return reviews.map((review, idx) => {
        const { fullName, rating, date, txt } = review
        return <span key={idx}>
            <p>FullName: {fullName}</p>
            {<StarRating rating={rating} />}
            <p>Date: {date}</p>
            <p>{txt}</p>
            <button onClick={() => onRemoveReview(review.id)}>x</button>
        </span>
    })
}