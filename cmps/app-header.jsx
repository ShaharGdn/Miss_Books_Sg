const { NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter


export function AppHeader() {
    const navigate = useNavigate()
    return <header>
        <nav>
            {/* <NavLink to="/book"><h1 className="logo">Miss Books</h1></NavLink> */}
            <h1 className="logo" onClick={() => navigate('/book')}>Miss Books</h1>
            <section className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/about">About</NavLink>
            </section>
        </nav>
    </header>

}