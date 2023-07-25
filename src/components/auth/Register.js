import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const [user, setUser] = useState({
        email: "",
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

                    navigate("/")
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
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for SkyInsight</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateUser}
                           type="text" id="firstName" className="form-control"
                           placeholder="Enter first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUser}
                           type="text" id="lastName" className="form-control"
                           placeholder="Enter your name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

