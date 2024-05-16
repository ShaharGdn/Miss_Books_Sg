import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="book-filter">
        <h3>Filter The Books</h3>
        <section className="filter-by">
            <label htmlFor="title">Title: </label><input id="title" onChange={handleChange} autoFocus name="title" type="text" placeholder="Title" />
            <label htmlFor="minPrice">Min Price: </label><input id="minPrice" onChange={handleChange} name="minPrice" type="number" placeholder="Min Price" />
            <label htmlFor="maxPrice">Max Price: </label><input id="maxPrice" onChange={handleChange} name="maxPrice" type="number" placeholder="Max Price" />
        </section>
    </section>
}