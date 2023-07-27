export const Comment = ({id, datePosted, comment, rating, edited, dateEdited, firstName, lastName}) => {
    
    // read: 
    // string interpolation, with proper html element structuring.
    // if edited===true, display dateEdited alongside datePosted.

    // userid will need to be accessed from local storage and, if matches with a given comment,
    // edit and delete buttons will appear.
    // components will need to be made for these.

    // // edit: "put" api call specified by comment ID
    // // delete: "delete" api call specified by comment ID
    
    // rating will need to be parsed into stars. A new component.

    const editedOrNot = (edited, dateEdited) => {
        return edited ? dateEdited : ""
    }

    return <div className="comments__container" key={id}>
        <>{firstName} {lastName[0]}. said: {comment} Posted {datePosted} {rating} </>
        <>{editedOrNot(edited, dateEdited)}</>
    </div>
}