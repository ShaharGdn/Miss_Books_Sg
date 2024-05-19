const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return <header>
        <nav>
            <h1>Miss Books</h1>
            <section className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/about">About</NavLink>
            </section>
        </nav>
    </header>

}