import React from 'react';
import Relay from 'react-relay';
import Rating from './Rating';

export default class Feedback extends React.Component {
    constructor(props) {
        super(props)
    }

    renderRating(count){
        var rows=[];
        for(var i=0;i<=count;i++){
            rows.push(<Rating/>);
        }
        return rows;
    }

    render() {
        var {feedbacks} = this.props;
        return <table className="table table-condensed table-hover table-responsive">
            <thead>
            <tr>
                <th>#</th>
                <th>Id</th>
                <th>Comment</th>
                <th>Rating</th>
            </tr>
            </thead>
            <tbody>
            {feedbacks && feedbacks.map((fb, i)=> {
                return <tr key={i}>
                    <td className="col-md-1">{i}</td>
                    <td className="col-md-1">{fb.id}</td>
                    <td className="col-md-8">{fb.comment}</td>
                    <td className="col-md-2">{this.renderRating(fb.rating)}</td>
                </tr>
            })}
            </tbody>
        </table>
    }
}