import React from 'react';

var Footer = React.createClass({

  render : function () {

    return(

      <div className="related">
        <p>Created by :<a href="https://twitter.com/fethica" style={{color: '#FFF'}} target="_blank">Fethi El Hassasna</a></p>
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