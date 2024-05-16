import { RateBySelect, RateByTextBox } from "./rating.jsx"
import { StarRating } from "./star-rating.jsx"

const { useRef, useState} = React

// export function AddReview({ onSaveReview, onToggleReviewModal }) {
//     const currRef = useRef()

//     const [review, setReview] = useState({
//         fullName: 'Books Reader',
//         rating: 0,
//         date: new Date().toISOString().slice(0, 10),
//         txt: '',
//     })

//     function handleChange({ target }) {
//         const { value, name: field } = target
//         setReview((prevReview) => ({ ...prevReview, [field]: value }))
//     }

//     function onAddReview(ev) {
//         ev.preventDefault()
//         onSaveReview(review)
//         onToggleReviewModal()
//     }

//     const { fullName, date, txt, rating } = review
//     return <dialog open type="modal" className="addReview">
//         <form onSubmit={onAddReview}>
//             <input autoFocus type="text" name="fullName" placeholder="Your Name" value={fullName} onChange={handleChange} />
//             <input type="date" name="date" value={date} onChange={handleChange} />
//             <StarRating handleChange={handleChange} rating={rating} />
//             <textarea
//                 name='txt'
//                 cols='30'
//                 rows='10'
//                 value={txt}
//                 onChange={handleChange}
//             ></textarea>            <button>Add</button>
//             <button onClick={onToggleReviewModal}>x</button>
//         </form>
//     </dialog>
// }


export function AddReview({ onSaveReview, onToggleReviewModal }) {
    const currRef = useRef()

    const [review, setReview] = useState({
        fullName: 'Books Reader',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
    })

    const [type, setType] = useState(null)

    const { fullName, date, txt, rating } = review

    function handleChange({ target }) {
        const { value, name: field } = target
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onAddReview(ev) {
        ev.preventDefault()
        onSaveReview(review)
        onToggleReviewModal()
    }

      function DynamicCmp(props) {
        switch (props.type) {
            case 'select':
                return <RateBySelect {...props} />
            case 'txt':
                return <RateByTextBox {...props} />
            case 'stars':
                return <StarRating {...props} />
        }
    }

    function onSelectType({ target }) {
        const { value: type } = target
        setType(type)
    }

    function GetRatingType({onSelectType}) {
        return <section>
                <h3>Add A Review</h3>
                <input
                    type="radio"
                    name="type"
                    id="txt"
                    value="txt"
                    onChange={onSelectType}
                />
                <label htmlFor="txt">By Text</label>

                <input
                    type="radio"
                    name="type"
                    id="stars"
                    value="stars"
                    onChange={onSelectType}
                />
                <label htmlFor="stars">By Stars</label>

                <input
                    type="radio"
                    name="type"
                    id="select"
                    value="select"
                    onChange={onSelectType}
                />
                <label htmlFor="select">By Select</label>
            </section>
    }

    return <dialog open type="modal" className="addReview">
        <form onSubmit={onAddReview}>
            <input autoFocus type="text" name="fullName" placeholder="Your Name" value={fullName} onChange={handleChange} />
            <input type="date" name="date" value={date} onChange={handleChange} />
            <GetRatingType onSelectType={onSelectType}/>
            <DynamicCmp
                type={type}
                fullName={fullName}
                date={date}
                txt={txt}
                rating={rating}
                onAddReview={onAddReview}
                handleChange={handleChange}
                onToggleReviewModal={onToggleReviewModal}
            />
            <textarea
                name='txt'
                cols='30'
                rows='10'
                value={txt}
                onChange={handleChange}
            ></textarea>            
            <button>Add</button>
            <button onClick={onToggleReviewModal}>x</button>
        </form>
    </dialog>
}
