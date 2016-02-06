import React from 'react';
import Relay from 'react-relay';
import Customers from './Customers';

class App extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        //do something before mount
    }

    _handleCustomerLimitChange(e) {
        this.props.relay.setVariables({
            customerLimit: parseInt(e.target.value)
        })
    }

    render() {
        let selectedCustomerLimit = this.props.relay.variables.customerLimit;

        return (
            <div>
                <h1 className="text-center text-muted">
                    <i className="glyphicon glyphicon-user text-muted"/>&nbsp;
                    Customer list
                </h1>
                <div className="form-group-sm ">
                    <select ref="customerLimit"
                            className="form-control"
                            onChange={this._handleCustomerLimitChange.bind(this)}
                            defaultValue={selectedCustomerLimit}>
                        {this.props.count.map((i)=> {
                            return <option key={i} value={i}>{i} customers</option>
                        })}
                    </select>
                </div>
                <hr/>
                    {this.props.asset.customers.map((customer,i)=>{
                        return <Customers customer={customer} key={i}/>;
                    })}
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
                ${Customers.getFragment('customer')}
            }
        }`
    }
});
