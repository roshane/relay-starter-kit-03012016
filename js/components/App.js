import React from 'react';
import Relay from 'react-relay';
import FeedBack from './Feedback';

class App extends React.Component {

    static defaultProps = {
        count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };

    constructor(props) {
        super(props)
    }

    _handleCustomerLimitChange(e){
        this.props.relay.setVariables({
            customerLimit:parseInt(e.target.value)
        })
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div>
                    limit : <select ref="customerLimit"
                                    onChange={this._handleCustomerLimitChange.bind(this)}>
                    {this.props.count.map((i)=>{
                        return <option key={i} value={i}>{i} customers</option>
                    })}
                </select>
                </div>
                <hr/>
                <h1>Customer list</h1>
                <ul>
                    {this.props.asset.customers.map((customer, i)=> {
                        return <li key={i}>
                            <p>Customer Id : {customer.id}</p>
                            <p>First Name :{customer.firstName}</p>
                            <p>Last Name : {customer.lastName}</p>
                            <p>Age : {customer.age}</p>
                            <ul>
                                {customer.feedbacks.map((feedback, i)=> {
                                    return <FeedBack key={i} feedback={feedback}/>
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
    initialVariables: {
        customerLimit: 10
    },
    fragments:{
        asset:()=>Relay.QL`fragment on Asset{
            customers(limit:$customerLimit){
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
