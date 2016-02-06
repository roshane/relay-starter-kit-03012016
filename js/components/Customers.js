import React from 'react';
import Relay from 'react-relay';

import FeedBack from './Feedback';

class Customers extends React.Component {

    componentWillMount() {
        console.log('componentWillMount ', this.props);
    }

    render() {
        var customer = this.props.customer;
        return <div>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-3">
                            <strong>Id: </strong>{customer.id}
                        </div>
                        <div className="col-md-3">
                            <strong>Name : </strong>{`${customer.firstName} ${customer.lastName}`}
                        </div>
                        <div className="col-md-3">
                            <strong>Age :</strong>{customer.age}
                        </div>
                        <div className="col-md-3">
                            <strong>Phone no : </strong>{customer.phoneNumber}
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <FeedBack feedbacks={customer.feedbacks}/>
                </div>
            </div>
        </div>
    }
}

export default Relay.createContainer(Customers,{
    fragments:{
        customer:()=>Relay.QL`fragment on Customer{
            id
            age
            firstName
            lastName
            phoneNumber
            feedbacks{
                id
                rating
                comment
            }

        }`
    }
});