import React from "react";
import ReactDOM from 'react-dom';
//simple footer, need improvements

var Footer = React.createClass({

  render : function () {

    return(

      <div className="related">
      <p> Made with <span className="glyphicon glyphicon-heart"></span>  by <a href="http://github.com/yuripramos" target="_blank" className="mysign">Yuri Ramos</a></p>
				<a href="http://tympanus.net/codrops/2014/01/14/look-inside-book-preview-with-bookblock/" target="_blank">
					<img src="../img/bookpreview.png" />
					<h3>Book Preview</h3>
				</a>
				<a href="http://facebook.github.io/react/" target="_blank">
					<img src="../img/react.png" />
					<h3>React JS</h3>
				</a>
				<a href="https://developers.google.com/books/?hl=en" target="_blank">
					<img src="../img/googlebooks.png" />
					<h3>Google Books API</h3>
				</a>
			</div>
    );

  }

});

export default Footer;