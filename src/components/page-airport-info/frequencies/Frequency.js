// assignsed on order:
// weather (1), clearance (2), ground (3), tower (4), CTAF (5), UNICOM (6), Approach (7), Departure (8), App/Dep (9), Flight Service (10), Emergency (11), Other (12)

export const Frequency = ({freqObj}) => {
    
    const convertStrToTitleCase = (string) => {
        return string
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    
     if (freqObj.FREQ > 136.975 || freqObj.FREQ < 118 || freqObj.FREQ.includes("/")) {
        // filters out all non-civilian aviation frequencies & nav frequencies
        return ""

    } else if (freqObj.FREQ_USE.startsWith("ATIS") || freqObj.FREQ_USE.startsWith("D-ATIS")) {
        // Weather: ATIS, D-ATIS
        return (
            <div className="frequency__container">
                {freqObj.FREQ_USE === "D-ATIS" ? <div className="frequency__name">Digital ATIS</div> : <div className="frequency__name">{freqObj.FREQ_USE}</div>}
                <div className="frequency__freq">{freqObj.FREQ}</div>
                {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
            </div>
        )
    
    } else if (freqObj.FACILITY_TYPE.startsWith("AWOS") || freqObj.FACILITY_TYPE.startsWith("ASOS")) {
        // Weather: AWOS, ASOS
        return (
            <div className="frequency__container">
                <div className="frequency__name">{freqObj.FACILITY_TYPE}</div>
                <div className="frequency__freq">{freqObj.FREQ}</div>
                {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
            </div>
        )

    } else if (freqObj.FREQ_USE.startsWith("CD")) {
        // Clearance Delivery
        return (
            <div className="frequency__container">
                <div className="frequency__name">{convertStrToTitleCase(freqObj.TOWER_OR_COMM_CALL)} Clearance</div>
                <div className="frequency__freq">{freqObj.FREQ}</div>
                {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
            </div>
        )
    
    } else if (freqObj.FREQ_USE.startsWith("RAMP")) {
        // Ramp Control
        return (
            <div className="frequency__container">
                <div className="frequency__name">Ramp Control</div>
                <div className="frequency__freq">{freqObj.FREQ}</div>
                {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
            </div>
        )

    } else if (freqObj.FREQ_USE.startsWith("GND")) {
        // Ground
        return (
            <div className="frequency__container">
                <div className="frequency__name">{convertStrToTitleCase(freqObj.TOWER_OR_COMM_CALL)} Ground</div>
                <div className="frequency__freq">{freqObj.FREQ}</div>
                {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
            </div>
        )

    } else if (freqObj.FREQ_USE.startsWith("LCL")) {
        // Tower
        return (
            <div className="frequency__container">
                <div className="frequency__name">{convertStrToTitleCase(freqObj.TOWER_OR_COMM_CALL)} Tower</div>
                <div className="frequency__freq">{freqObj.FREQ}</div>
                {freqObj.TOWER_HOURS === 24 ? <div className="frequency__towerHours">24 H</div> : <div className="frequency__towerHours">{freqObj.TOWER_HRS} local</div>}
                {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
            </div>
        )

    } else if (freqObj.FACILITY_TYPE.startsWith("CTAF")) {
        // CTAF
        return (
            <div className="frequency__container">
                <div className="frequency__name">CTAF</div>
                <div className="frequency__freq">{freqObj.FREQ}</div>
            </div>
        )

    } else if (freqObj.FACILITY_TYPE.startsWith("UNICOM")) {
        // UNICOM
        return (
            <div className="frequency__container">
                <div className="frequency__name">{freqObj.FACILITY_TYPE}</div>
                <div className="frequency__freq">{freqObj.FREQ}</div>
                {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
            </div>
        )

    } else if (freqObj.FREQ_USE.includes("APCH") && freqObj.FREQ_USE.includes("DEP")) {
        // Labeled both "approach" and "departure"
        return ""
        // return (
        //     <div className="frequency__container">
        //         <div className="frequency__name">{convertStrToTitleCase(freqObj.PRIMARY_APPROACH_RADIO_CALL)} Approach/Departure</div>
        //         <div className="frequency__freq">{freqObj.FREQ}</div>
        //         {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
        //     </div>
        // )

    } else if (freqObj.FREQ_USE.startsWith("APCH")) {
        // Approach
        return ""
        // return (
        //     <div className="frequency__container">
        //         <div className="frequency__name">{convertStrToTitleCase(freqObj.PRIMARY_APPROACH_RADIO_CALL)} Approach</div>
        //         <div className="frequency__freq">{freqObj.FREQ}</div>
        //         {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
        //     </div>
        // )

    } else if (freqObj.FREQ_USE.startsWith("DEP")) {
        // Approach
        return ""
        // return (
        //     <div className="frequency__container">
        //         <div className="frequency__name">{convertStrToTitleCase(freqObj.PRIMARY_DEPARTURE_RADIO_CALL)} Departure</div>
        //         <div className="frequency__freq">{freqObj.FREQ}</div>
        //         {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
        //     </div>
        // )

    } else if (freqObj.FACILITY_TYPE.startsWith("RCO") && freqObj.FREQ.includes("R") || freqObj.FACILITY_TYPE.startsWith("GCO") && freqObj.FREQ.includes("R")) {
        // Flight Service (GCO / RCO) - receiving only
        return (
            <div className="frequency__container">
                <div className="frequency__name">Flight Service ({freqObj.FACILITY_TYPE}, R only)</div>
                <div className="frequency__freq">{freqObj.FREQ.slice(0, -1)}</div>
                {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
            </div>
        )

    } else if (freqObj.FACILITY_TYPE.startsWith("RCO") || freqObj.FACILITY_TYPE.startsWith("GCO")) {
        // Flight Service (GCO / RCO)
        return (
            <div className="frequency__container">
                <div className="frequency__name">Flight Service ({freqObj.FACILITY_TYPE})</div>
                <div className="frequency__freq">{freqObj.FREQ}</div>
                {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
            </div>
        )

    } else if (freqObj.FREQ_USE.startsWith("EMERG")) {
        // Emergency
        return (
            <div className="frequency__container">
                <div className="frequency__name">Emergency</div>
                <div className="frequency__freq">{freqObj.FREQ}</div>
                {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
            </div>
        )

    } else {
        // covers all other misc frequencies
        return ""
        // return (
        //     <div className="frequency__container">
        //         <div className="frequency__name">{freqObj.FREQ_USE}</div>
        //         <div className="frequency__freq">{freqObj.FREQ}</div>
        //         {freqObj.SECTORIZATION.length > 0 ? <div className="frequency__sector">{freqObj.SECTORIZATION}</div> : ""}
        //     </div>
        // )
    }
}
    
    // Emergency "EMERG"

    // RCO (Flight Service)
    // FACILITY_TYPE === "GCO" "RCO"
    // comments: FREQ_USE

    // Other
    // Freq use - freq - sectorization (likely commments string)
