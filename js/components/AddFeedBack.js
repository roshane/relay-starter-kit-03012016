import React from 'react';
import Relay from 'react-relay';

class AddFeedBack extends React.Component{
    render(){
        console.log('rendering [AddFeedBack]',this.props);
        return <div>
            Hello you are there
        </div>
    }
}


export default Relay.createContainer(AddFeedBack,{
   fragments:{
       asset:()=>Relay.QL`fragment on Asset{
         customers{
         id
         }
       }`
   }
});