const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { Home } from "./pages/home.jsx"
import { BookIndex } from "./pages/book-index.jsx"
import { BookEdit } from "./pages/book-edit.jsx"
import { About } from "./pages/about.jsx"
import { BookDetails } from "./pages/book-details.jsx"

import { AppHeader } from "./cmps/app-header.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { GoogleBookAdd } from "./pages/book-add.jsx"

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
                    <Route path="/book/add" element={ <GoogleBookAdd /> }/>
                </Routes>
            </main>
            <UserMsg />
        </Router>
    )
}