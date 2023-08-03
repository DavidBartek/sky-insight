import { useEffect, useState } from "react"
import { fetchChartSupplement } from "../../../DataAccess"

export const AirportChartSupplement = ({airportId}) => {
    
    const [chartSupplement, setChartSupplement] = useState("")

    useEffect(
        () => {
            fetchChartSupplement(airportId)
                .then((data) => {
                    setChartSupplement(data[0]?.url)
                })
        },
        []
    )

    if (!chartSupplement || chartSupplement === "") {
        return (
            <div className="airport__chartSupplement">
                <h3 className="chartSupplement__header">Chart Supplement</h3>
                <div>No chart supplement available for {airportId}.</div>
            </div>
        )
    }
    return (
        <div className="airport__chartSupplement">
            <h3 className="chartSupplement__header">Chart Supplement</h3>
            <object 
                className="chartSupplement__pdf"
                data={chartSupplement}
                type="application/pdf"
                style={{width: '450px', height: '710px', frameborder: '0'}}
            />
        </div>
    )
}
