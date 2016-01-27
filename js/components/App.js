import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
    render() {

        console.log(this.props.asset.customers);
        return (
            <div>
                <h1>Customer list</h1>
                <ul>
                    {this.props.asset.customers.map((customer)=> {
                        return <li>
                            <p>Customer Id : {customer.id}</p>
                            <p>First Name :{customer.firstName}</p>
                            <p>Last Name : {customer.lastName}</p>
                            <p>Age : {customer.age}</p>
                            <ul>
                                {customer.feedbacks.map((feedback)=> {
                                    return <li>
                                        <p>Feedback ID : {feedback.id}</p>
                                        <p>Rating : {feedback.rating}</p>
                                        <p>Comment : {feedback.comment}</p>
                                    </li>
                                })}
                            </ul>
                            <hr/>
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Relay.createContainer(App, {
    fragments:{
        asset:()=>Relay.QL`fragment on Asset{
            customers{
                id
                firstName
                lastName
                age
                feedbacks{
                    id
                    rating
                    comment
                }
            }
        }`
    }
});
