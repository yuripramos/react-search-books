import React, {Component} from 'react';
import AutoComplete from '../../node_modules/material-ui/AutoComplete';
import ReactDOM from 'react-dom';


//  const Header = React.createClass({

//   handleSubmit : function (e) {
//     e.preventDefault();
//     var input = ReactDOM.findDOMNode(this.refs.search);

//     this.props.localSubmit(input.value);

//     input.value = '';

//   },
//   render : function () {
//     return (
//       <header className="codrops-header">
// 				<div>
// 					<form className="form-inline" style={{marginTop: 30 + 'px'}} onSubmit={this.handleSubmit}>
//             <div className="form-group">
// 						    <input className="form-control" placeholder="Book Title ..." ref="search"/>
// 						    <button className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
//             </div>
// 					</form>
// 				</div>
// 			</header>
//     );
//   }
// });

const Header = React.createClass ({
  getInitialState : function () {
    return ({dataSource:[]});
  },
  handleUpdateInput : function (value) {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  },
  handleSubmit : function (value)  {
  var input = this.state.dataSource[0];
  this.props.localSubmit(input);


  },
  _handleTextFieldChange: function(event, index, obj) {
    this.setState({
        AutoCompleteValue: e.target.value
    });
  },
  render() {
    return (
      <div>
        <AutoComplete
          hintText="Type here"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText="Type the name of the book"
          fullWidth={true}
          onNewRequest={this.handleSubmit}
          onChange={this._handleTextFieldChange}

        />
      </div>
    );
  }
});

 export default Header;
