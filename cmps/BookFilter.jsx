import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookFilter({ filterBy, onFilter }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    
    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])
    
    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="car-filter">
        <h3>Filter</h3>

        <input onChange={handleChange} autoFocus name="title" type="text" placeholder="Title"/>
        <input onChange={handleChange} name="maxPrice" type="number" placeholder="Max Price"/>
    </section>
}