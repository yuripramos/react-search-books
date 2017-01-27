import React from 'react';


var CurrentBook = React.createClass({

	toggleFavorite(){
		this.props.onFavoriteToggle(this.props.book);
	},

	render(){

		var starClassName = "glyphicon glyphicon-star-empty";

		if(this.props.favorite){
			starClassName = "glyphicon glyphicon-star";
		}

		return (
			<div className="col-xs-12 col-md-6 col-md-offset-3 current-Book">
				<h4 id="save-Book">{this.props.book}</h4>
				<span className={starClassName} onClick={this.toggleFavorite} aria-hidden="true"></span>
			</div>
		);
	}

});

module.exports = CurrentBook;