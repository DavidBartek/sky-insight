import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiUser, BiEnvelope, BiLock } from "react-icons/bi"
import { PiUsersThreeBold } from "react-icons/pi"

export const Register = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        joinDate: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("skyinsight_user", JSON.stringify({
                        id: createdUser.id,
                        firstName: createdUser.firstName,
                        lastName: createdUser.lastName,
                        joinDate: createdUser.joinDate
                    }))

                    navigate("/search")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        user.joinDate = getCurrentDateAsString()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const getCurrentDateAsString = () => {
        const currentDate = new Date();
      
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
      
        const formattedDate = `${year}-${month}-${day}`;
      
        return formattedDate;
      }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main>
            <div className="background__container"></div>
            <div className="login__container">
                <section>
                    <form className="login__form" onSubmit={handleRegister}>
                        <img className="login__logo" src="/SkyInsight_e38260.svg"></img>
                        <h1 className="register__header">Please register to use SkyInsight</h1>
                        <fieldset className="form__group">
                            <label className="form__subhead" htmlFor="firstName"> First Name </label>
                            <div className="input__wrapper">
                                <BiUser className="input__icon"/>
                                <input type="text"
                                    onChange={updateUser}
                                    id="firstName"
                                    className="input__form" 
                                    placeholder="Enter first name" 
                                    required autoFocus />
                            </div>
                        </fieldset>
                        <fieldset className="form__group">
                            <label className="form__subhead" htmlFor="lastName"> Last Name </label>
                            <div className="input__wrapper">
                                <PiUsersThreeBold className="input__icon"/>
                                <input type="text"
                                    onChange={updateUser}
                                    id="lastName"
                                    className="input__form"
                                    placeholder="Enter last name" 
                                    required />
                            </div>
                        </fieldset>
                        <fieldset className="form__group">
                            <label className="form__subhead" htmlFor="email"> Email address </label>
                            <div className="input__wrapper">
                                <BiEnvelope className="input__icon"/>
                                <input type="email" 
                                    onChange={updateUser}
                                    id="email"
                                    className="input__form"
                                    placeholder="Email address"
                                    required />
                            </div>
                        </fieldset>
                        <fieldset className="form__group">
                            <label className="form__subhead" htmlFor="password"> Password </label>
                            <div className="input__wrapper">
                                <BiLock className="input__icon"/>
                                <input type="password"
                                    onChange={updateUser}
                                    id="password"
                                    className="input__form"
                                    placeholder="Password"
                                    required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <button className="form__button" type="submit">
                                REGISTER
                            </button>
                        </fieldset>
                    </form>
                </section>
                <section className="form__link">
                    <Link to="/login">Go back</Link>
                </section>
            </div>
        </main>
    )
}

