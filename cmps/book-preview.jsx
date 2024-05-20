import { utilService } from "../services/util.service.js"

export function BookPreview({ book }) {
    const { description, listPrice, title, thumbnail, authors } = book
    const { currencyCode, amount } = listPrice

    return (
        <article className="book-preview">
            <h3 className="title">{title}</h3>
            <div className="content">
                <p><span>By: </span> {authors}</p>
                <p><span>Price: </span>{amount}{utilService.getCurrencySign(currencyCode)}</p>
                {description && <p><span>Description: </span>{description.substring(0, 20)}...</p>}
                {thumbnail && <img src={thumbnail} alt="thumbnail of a book" />}
            </div>
        </article>
    )
}
