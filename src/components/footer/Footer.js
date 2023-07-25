import "./Footer.css"

export const Footer = () => {
    const currentYear = new Date().getFullYear()
    return <footer className="footer">©{currentYear} Sky Insight. Not to be used for navigation.</footer>
}