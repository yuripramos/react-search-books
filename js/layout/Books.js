import React from "react";
import ReactDOM from 'react-dom';
import Paper from '../../node_modules/material-ui/Paper';

var Books = React.createClass({

  getInitialState : function () {
    return ({});
  },
  componentDidMount : function () {

    if (this.props.item != null) {
      this.setState(this.props.item);
    }
    // console.log(this.props.item);

  },
  toggleFavorite(){
    this.props.onFavoriteToggle(this.props.Books);
  },
  render : function () {

    var authors = "";

    if (this.state.authors != null) {
      for (var i = 0; i < this.state.authors.length; i++) {

        if (i > 1) {
          authors = ", " + this.state.authors[i];
        } else {
          authors = this.state.authors[i];
        }
      }
    }
    var starClassName = "glyphicon glyphicon-star-empty";

    if(this.props.favorite){
      starClassName = "glyphicon glyphicon-star";
    }

    var descrip = "...";

    if (this.state.description != null) {
      descrip = this.state.description.substring(0, 180) + "...";
    }

    var id = "";

    if (this.props.identifier != null) {
      id = "book-" + this.props.identifier;
    }

    return (

      <figure >
        <div className="book" id={id}></div>
        <div className="buttons"><a href={this.state.previewLink} target="_blank">Preview</a><a href="#">Details</a></div>
       
        <figcaption><h2>{this.state.title}<span>{authors}</span></h2></figcaption>
        <div className="details">
          <ul>
            <li>{descrip}</li>
            <li>{this.state.publishedDate}</li>
            <li>{this.state.publisher}</li>
            <li>{this.state.pageCount} pages</li>
          </ul>
        </div>
      </figure>

    );
  }

});

export default Books;