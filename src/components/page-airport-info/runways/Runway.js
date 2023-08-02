export const Runway = ({runway}) => {
    // if block: e.g., ASE has a runway "00X" - want to exclude this
    if (runway.name.startsWith("00")) {
        return ""
    }
    return (
        <div className="runway__container">
            <div className="runway__name">{runway.name}</div>
            <div className="runway__lengths">{runway.length}' x {runway.width}'</div>
        </div>
    )
}

// runways accessed:

// runways (array) < iterate over this
// runway.name "02C/20C"
// runway.length 8001
// runway.width 150