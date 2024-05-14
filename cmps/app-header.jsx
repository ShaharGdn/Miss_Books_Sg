const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return <header>
        <nav>
            <section className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/about">About</NavLink>
            </section>
        </nav>
    </header>

}