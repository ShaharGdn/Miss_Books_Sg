import { StarRating } from "./star-rating.jsx"

const { useRef, useState, useEffect } = React

export function AddReview({ onSaveReview, onToggleReviewModal }) {
    const currRef = useRef()

    const [review, setReview] = useState({
        fullName: 'Books Reader',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
    })

    function handleChange({ target }) {
        const { value, name: field } = target
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onAddReview(ev) {
        ev.preventDefault()
        onSaveReview(review)
        onToggleReviewModal()
    }

    const { fullName, date, txt, rating } = review
    return <dialog open type="modal" className="addReview">
        <form onSubmit={onAddReview}>
            <input autoFocus type="text" name="fullName" placeholder="Your Name" value={fullName} onChange={handleChange} />
            <input type="date" name="date" value={date} onChange={handleChange} />
            <StarRating handleChange={handleChange} rating={rating} />
            <textarea
                name='txt'
                cols='30'
                rows='10'
                value={txt}
                onChange={handleChange}
            ></textarea>            <button>Add</button>
            <button onClick={onToggleReviewModal}>x</button>
        </form>
    </dialog>
}