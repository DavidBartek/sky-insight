import { Link, useNavigate } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import { BiUser } from "react-icons/bi"
import { BiLogOut } from "react-icons/bi"

export const NavBarHamburger = ({setHamburgerOpen}) => {
    
    const navigate = useNavigate()
    
    return (
        <div className="navbar__links">
            <div className="navbar__item navbar__search">
                <Link className="navbar__link" to="/search" onClick={() => {setHamburgerOpen(false)}}>
                    <div><BiSearch /></div>
                    <div>Search</div>
                </Link>
            </div>
            <div className="navbar__item navbar__profile">
                <Link className="navbar__link" to="/profile" onClick={() => {setHamburgerOpen(false)}}>
                    <div><BiUser /></div>
                    <div>Profile</div>
                </Link>
            </div>
            <div className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("skyinsight_user")
                    navigate("/", {replace: true}); setHamburgerOpen(false)
                }}>
                    <div><BiLogOut /></div>
                    <div>Logout</div>
                </Link>
            </div>
        </div>
    )
}