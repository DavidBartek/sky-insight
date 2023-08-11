import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { fetchLogin } from "../../DataAccess";
import { BiEnvelope, BiLock } from "react-icons/bi"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        fetchLogin(email)
            .then((foundUsers) => {
                console.log(foundUsers)
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    if (user.password === password) {
                        localStorage.setItem("skyinsight_user", JSON.stringify({
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            joinDate: user.joinDate
                        }))

                        navigate("/search")
                    } else {
                        window.alert("Invalid login")
                    }
                }
                else {
                    window.alert("Invalid login")
                }
            })
        
    }

    return (
        <main className="loginPage">
            <div className="background__container"></div>
            <div className="login__container">
                <section>
                    <form className="login__form" onSubmit={handleLogin}>
                        <img className="login__logo" src="/SkyInsight_e38260.svg"></img>
                        <fieldset className="form__group">
                            <label className="form__subhead" htmlFor="inputEmail"> Email address </label>
                            <div className="input__wrapper">
                                <BiEnvelope className="input__icon"/>
                                <input type="email"
                                    value={email}
                                    onChange={evt => setEmail(evt.target.value)}
                                    className="input__form"
                                    placeholder="Email address"
                                    required autoFocus />
                            </div>
                        </fieldset>
                        <fieldset className="form__group">
                            <label className="form__subhead" htmlFor="inputPassword"> Password </label>
                            <div className="input__wrapper">
                                <BiLock className="input__icon"/>
                                <input type="password"
                                    value={password}
                                    onChange={evt => setPassword(evt.target.value)}
                                    className="input__form"
                                    placeholder="Password"
                                    required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <button className="form__button" type="submit">
                                LOGIN
                            </button>
                        </fieldset>
                    </form>
                </section>
                <section className="form__linkContainer"> 
                    <Link className="form__link" to="/register">Sign Up</Link>
                </section>
            </div>
        </main>
    )
}
