import { utilService } from "../services/util.service.js"

export function BookPreview({ book }) {
    const { description, listPrice, title, thumbnail, authors } = book
    const { currencyCode, amount } = listPrice

    return (
        <article className="book-preview">
            <h3 className="title">{title}</h3>
            <div className="content">
                <p>By: {authors}</p>
                <p>Price: {amount}{utilService.getCurrencySign(currencyCode)}</p>
                {description && <p>Description: {description.substring(0, 20)}...</p>}
                <img src={thumbnail} alt="thumbnail of a book" />
            </div>
        </article>
    )
}
