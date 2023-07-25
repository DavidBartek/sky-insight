import { Outlet, Route, Routes } from "react-router-dom"
import { SearchPage } from "../page-search/SearchPage"
import { AirportPage } from "../page-airport-info/AirportPage"
import { Profile } from "../page-profile/Profile"

export const ApplicationRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <Outlet /> } >
                <Route path="search" element={ <SearchPage />} />
                <Route path="airports/:airportIcao" element={ <AirportPage />} />
                <Route path="profile" element={ <Profile />} />
            </Route>
        </Routes>
    )
}