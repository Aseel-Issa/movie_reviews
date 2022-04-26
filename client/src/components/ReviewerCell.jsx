

export default function ReviewerCell (props){

    const deleteReview = () => {
        props.deleteReview(props.index)
    }

    const btn = props.r.user_id == props.loggedInUser._id ? <button onClick={deleteReview}>Del</button> : null
    return(
        <td className={props.classType}><label>{props.r.reviwer}   </label>{btn}</td>
    )
}