const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"

const { useState } = React

// export function RootCmp() {

//     const [ route, setRoute ] = useState('Books')

//     return (
//         <React.Fragment>
//             <header>
//                 <h1>Miss Books</h1>
//                 <nav>
//                     <a onClick={() => setRoute('Home')} href="#">Home</a>
//                     <a onClick={() => setRoute('Books')} href="#">Books</a>
//                     <a onClick={() => setRoute('About')} href="#">About</a>
//                 </nav>
//             </header>
            
//             <main className="content-grid">
//                 {route === 'Home' && <Home />}
//                 {route === 'Books' && <BookIndex />}
//                 {route === 'About' && <About />}
//             </main>
//         </React.Fragment>
//     )
// }

export function RootCmp() {

    return (
        <Router>
            <AppHeader />
            <main className="content-grid">
                <Routes>
                    <Route path="/" element={ <Home /> }/>
                    <Route path="/book" element={ <BookIndex /> }/>
                    <Route path="/about" element={ <About /> }/>
                    <Route path="/book/:bookId" element={ <BookDetails /> }/>
                    <Route path="/book/edit/" element={ <BookEdit /> }/>
                    <Route path="/book/edit/:bookId" element={ <BookEdit /> }/>
                </Routes>
            </main>
        </Router>
    )
}