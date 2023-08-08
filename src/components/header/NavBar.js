import { Link, useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import { BiUser } from "react-icons/bi"
import { BiLogOut } from "react-icons/bi"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <img className="navbar__logo" src="/SkyInsight_ecdac9.svg"></img>
            <div className="navbar__links">
                <li className="navbar__item navbar__search">
                    <Link className="navbar__link" to="/search">
                        <div><FaSearch /></div>
                        <div>Search</div>
                    </Link>
                </li>
                <li className="navbar__item navbar__profile">
                    <Link className="navbar__link" to="/profile">
                        <div><BiUser /></div>
                        <div>Profile</div>
                    </Link>
                </li>
                <li className="navbar__item navbar__logout">
                    <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("skyinsight_user")
                        navigate("/", {replace: true})
                    }}>
                        <div><BiLogOut /></div>
                        <div>Logout</div>
                    </Link>
                </li>
            </div>
        </ul>
    )
}