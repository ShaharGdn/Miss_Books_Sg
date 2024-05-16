import { StarRating } from "./star-rating.jsx"

const { useRef, useState } = React

export function RateBySelect({ handleChange, rating }) {
    return <select name="rating" id="rating" onChange={handleChange} value={rating}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
    </select>
}

export function RateByTextBox({ handleChange, rating }) {
    return <textarea
        name='rating'
        value={rating}
        onChange={handleChange}
    ></textarea>
}

