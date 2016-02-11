import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    customers:()=>Relay.QL`fragment on Customer{
        id
        name
        phoneNumber
    }`
  }
});
