import React from 'react';
import BookItem from './BookItem';


var BookList = React.createClass({

	render(){

		var self = this;

		var Books = this.props.Books.map(function(l){

			var active = self.props.activeLocationBook == l.Book;

			// Notice that we are passing the onClick callback of this
			// LocationList to each LocationItem.

			return <BookItem Book={l.Book} timestamp={l.timestamp} 
					active={active} onClick={self.props.onClick} />
		});

		if(!Books.length){
			return null;
		}

		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<span className="list-group-item active">Saved Books</span>
				{Books}
			</div>
		)

	}

});

module.exports = BookList;