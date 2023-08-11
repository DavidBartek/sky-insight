import { BiMenu } from "react-icons/bi"
import "./NavBar.css"
import { useState } from "react"
import { NavBarHamburger } from "./NavBarHamburger"
import { useRef } from "react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

export const NavBar = () => {
    
    const [hamburgerOpen, setHamburgerOpen] = useState(false)
    const targetRef = useRef(null)

    const params = useParams()
    const searchPageChecker = params["*"]
    
    useEffect(
        () => {
            const handleClickOutside = (e) => {
                if (targetRef.current && !targetRef.current.contains(e.target)) {
                    setHamburgerOpen(false)
                }
            }

            document.addEventListener('click', handleClickOutside)

            return () => {
                document.removeEventListener('click', handleClickOutside)
            }
        }, []
    )

    const handleHamburgerOpen = (e) => {
        e.preventDefault()
        setHamburgerOpen(true)
    }

    const handleHamburgerClosed = (e) => {
        e.preventDefault()
        setHamburgerOpen(false)
    }

    if (hamburgerOpen === false) {
        return (
            <div className="navbar">
                {searchPageChecker === "search" ? <div className="navbar__logoContainer"></div> : 
                <div className="navbar__logoContainer">
                    <Link to="/search">
                        <img className="navbar__logo" src="/SkyInsight_ecdac9.svg"></img>
                    </Link>
                </div> }
                <button className="navbar__hamburger--closed" onClick={(e) => handleHamburgerOpen(e)}><BiMenu /></button>
            </div>
        )
    } else {
        return (
            <div className="navbar">
                {searchPageChecker === "search" ? <div className="navbar__logoContainer"></div> : 
                <div className="navbar__logoContainer">
                    <Link to="/search">
                        <img className="navbar__logo" src="/SkyInsight_ecdac9.svg"></img>
                    </Link>
                </div> }
                <button className="navbar__hamburger--open" ref={targetRef} onClick={(e) => handleHamburgerClosed(e)}><BiMenu /></button>
                <NavBarHamburger setHamburgerOpen={setHamburgerOpen}/>
            </div>
        )
    }
}