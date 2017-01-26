import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'redux';
import {
  cloneDeep, findIndex, orderBy, keys, values, transforms
} from 'lodash';
import Bookshelf from './bookshelf.js';
import ReactPaginate from 'react-paginate';

import Header from './layout/header.js';
import Footer from './layout/Footer.js';
import Books from './layout/Books.js';
// import {Paginator, paginate } from './helpers';

const app = document.getElementById('app');



export default class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      items:[],
      offset:0
    };

    this.localSubmit = this.localSubmit.bind(this);
    this.onPerPage = this.onPerPage.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

  }


  localSubmit(search) {

    this.setState({items: []});
    var component = this;

    $.get("https://www.googleapis.com/books/v1/volumes?q=intitle:" + encodeURIComponent(search) + "&printType=books&orderBy=newest&maxResults=39", function (data) {

      component.setState(data);
      Bookshelf();

      $(".front").css("background", "url(../img/no_book_cover.jpg)");

      for (var i = 0; i < component.state.items.length; i++) {
        if (component.state.items[i].volumeInfo.imageLinks != null) {

          $("#book-" + component.state.items[i].id).find(".front").css("background", "url("+ component.state.items[i].volumeInfo.imageLinks.thumbnail +")");
        }
      }


      $(".front").css("background-size", "100% 100%");
      $(".front").css("border", "2px solid #eee");
      $(".front").css("background-size", "100% 100%");


    });
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({offset: offset}, () => {
      this.loadCommentsFromServer();
    });
  };

  onSelect(page) {
    const pages = Math.ceil(
      this.state.items.length / 9
    );

    console.log(pages);

    this.setState({
      pagination: {
        perPage:this.state.pagination,
        page: Math.min(Math.max(page, 1), pages)
      }
    });
  }
  onPerPage(value) {
    this.setState({
      pagination: {
        page:this.state.pagination,
        perPage: parseInt(value, 10)
      }
    });
  }
  render () {
    const pages = Math.ceil(
      this.state.items.length / 9
    );
    console.log("length:"+this.state.items.length);
    console.log(pages);
    // const {
    //   pagination
    // } = this.state;
    // const paginated = compose(
    //   paginate(pagination));
    var books = [];
    var content;

    books = this.state.items.map(function(book) {
      return <Books key={book.id} item={book.volumeInfo} identifier={book.id} />;
    });

    if (books.length > 0) {
      content = books;
    } else {
      content = <div className="search-icon" ><span className="glyphicon glyphicon-search"></span></div>
    }

    return (
      <div>
      <Header localSubmit={this.localSubmit}/>
        <div className="main">
  				<div id="bookshelf" className="bookshelf">
            {content}
          </div>
          <ReactPaginate previousLabel={"previous"}
               nextLabel={"next"}
               breakLabel={<a href="">...</a>}
               breakClassName={"break-me"}
               pageCount={this.state.pageCount}
               marginPagesDisplayed={2}
               pageRangeDisplayed={3}
               onPageChange={this.handlePageClick.bind(this)}
               containerClassName={"pagination"}
               subContainerClassName={"pages pagination"}
               activeClassName={"active"} />
        </div>
        <Footer />
      </div>
    );

  }

}

ReactDOM.render(<Main  />, document.getElementById("app"));

