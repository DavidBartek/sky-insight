import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item navbar__search">
                <Link className="navbar__link" to="/search">Search</Link>
            </li>
            <li className="navbar__item navbar__profile">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("skyinsight_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}