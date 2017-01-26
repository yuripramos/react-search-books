import React from "react";
import ReactDOM from 'react-dom';

 const Header = React.createClass({

  handleSubmit : function (e) {
    e.preventDefault();
    var input = ReactDOM.findDOMNode(this.refs.search);

    this.props.localSubmit(input.value);

    input.value = '';

  },
  // handlePageClick(component){
  //   console.log(component);
  //   let selected = component.selected;
  //   let offset = Math.ceil(selected * this.props.perPage);
  //   console.log("the offset is:"+offset);
  //     this.setState({offset: offset}, () => {
  //     this.localSubmit();
  //   });
  // },

  render : function () {
    return (
      <header className="codrops-header">
				<h1>Book Search using React</h1>

				<div>
					<form className="form-inline" style={{marginTop: 30 + 'px'}} onSubmit={this.handleSubmit}>
            <div className="form-group">
						    <input className="form-control" placeholder="Book Title ..." ref="search"/>
						    <button className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
            </div>
					</form>
				</div>
			</header>
    );
  }
});

 export default Header;
