export const Runway = ({runway}) => {
    // if block: e.g., ASE has a runway "00X" - want to exclude this
    
    const convertRunwayCondition = (conditionCode) => {
        if (conditionCode === "ASPH-E") {
            return "Excellent asphalt"
        } else if (conditionCode === "ASPH-G") {
            return "Good asphalt"
        } else if (conditionCode === "ASPH-P") {
            return "Poor asphalt"
        } else if (conditionCode === "TURF-G") {
            return "Good turf"
        } else if (conditionCode === "TURF-P") {
            return "Poor turf"
        } else if (conditionCode === "CONC-E") {
            return "Excellent concrete"
        } else if (conditionCode === "CONC-G") {
            return "Good concrete"
        } else if (conditionCode === "CONC-P") {
            return "Poor concrete"
        } else {
            return ""
        }
    }
    
    if (runway.name.startsWith("00")) {
        return ""
    }
    return (
        <div className="runway__container">
            <div className="runway__name">{runway.name}</div>
            <div className="lengthConditionContainer">
                <div className="runway__lengths">{runway.length}' x {runway.width}'</div>
                <div className="runway__condition">{convertRunwayCondition(runway.surface_type_condition)}</div>
            </div>
        </div>
    )
}

// runways accessed:

// runways (array) < iterate over this
// runway.name "02C/20C"
// runway.length 8001
// runway.width 150