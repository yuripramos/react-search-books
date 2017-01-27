import React from 'react';
// import BookItem from './BookItem';
import moment from 'moment';

var BookItem = React.createClass({

	handleClick(){
		this.props.onClick(this.props.Book);
	},

	render(){

		var cn = "list-group-item";

		if(this.props.active){
			cn += " active-Book";
		}

		return (
			<a className={cn} onClick={this.handleClick}>
				{this.props.Book}
				<span className="createdAt">{ moment(this.props.timestamp).fromNow() }</span>
				<span className="glyphicon glyphicon-menu-right"></span>
			</a>
		)
	}

});

module.exports = BookItem;