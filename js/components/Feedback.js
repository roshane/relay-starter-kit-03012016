import React from 'react';
import Relay from 'react-relay';

export default class Feedback extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var {feedback} = this.props;
        console.log(feedback);
        return <div>
            <li>
                <p>Id : {feedback.id}</p>
                <p>Rating : {feedback.rating}</p>
                <p>Comment : {feedback.comment}</p>
            </li>
        </div>
    }
}

//export default Relay.createContainer(Feedback,{
//    fragments:{
//        feedback:()=>Relay.QL`fragment on Feedback{
//            id
//            rating
//            comment
//        }`
//    }
//});
