import { utilService } from "../services/util.service.js"


export function BookIndex() {
    const book = {
        id: utilService.makeId(),
        title: "Hope, Faith & Courage",
        description: "Hope, Faith & Courage Vol. II is now available as an eBook on most eBook retail websites.",
        thumbnail: "https://ca.org/content/uploads/2015/05/HFC2.png",
        listPrice: {
            amount: 12.5,
            currencyCode: "USD",
            isOnSale: false
        }
    }

    console.log('book:', book)



    return <section className="books">
        <h1>Books</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam sunt ducimus consectetur.</p>
    </section>
}