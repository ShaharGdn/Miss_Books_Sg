import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"

const { useState } = React

export function RootCmp() {

    const [ route, setRoute ] = useState('Books')

    return (
        <React.Fragment>
            <header>
                <h1>Miss Books</h1>
                <nav>
                    <a onClick={() => setRoute('Home')} href="#">Home</a>
                    <a onClick={() => setRoute('Books')} href="#">Books</a>
                    <a onClick={() => setRoute('About')} href="#">About</a>
                </nav>
            </header>
            
            <main className="content-grid">
                {route === 'Home' && <Home />}
                {route === 'Books' && <BookIndex />}
                {route === 'About' && <About />}
            </main>
        </React.Fragment>
    )
}