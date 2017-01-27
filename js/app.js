//Basics
import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'redux';
//UI
import injectTapEventPlugin from 'react-tap-event-plugin';// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import getMuiTheme from '../node_modules/material-ui/styles/getMuiTheme';
import * as Colors from '../node_modules/material-ui/styles/colors';
//Components and sctructure
import Bookshelf from './bookshelf.js';
import ReactPaginate from 'react-paginate';
import AppBar from '../node_modules/material-ui/AppBar';
import Header from './layout/header.js';
import Footer from './layout/Footer.js';
import Books from './layout/Books.js';


//This is the app component, the main component that loads other components that are mandatory for my application works, 
//heres is included my components of UI, Structure, all the "dumb" components and "smart" components
const app = document.getElementById('app');

const muiTheme = getMuiTheme({
 palette: {
    palette: {
      textColor: Colors.darkBlack,
      primary1Color: Colors.white,
      primary2Color: Colors.indigo700,
      accent1Color: Colors.redA200,
      pickerHeaderColor: Colors.darkBlack,
      alternateTextColor: Colors.redA200
    },
  },
  appBar: {
    height: 50,
  },
});
const page_size = 9;
export default class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      items:[],
      offset:0,
      favorites:[],
      currentPage:1
    };

    this.localSubmit = this.localSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.isBookInFavorites = this.isBookInFavorites.bind(this);

    if(localStorage.favorites){
      favorites = JSON.parse(localStorage.favorites);
    }
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

  handlePageClick(component){
    console.log(component);
    let selected = component.selected;
    let offset = Math.ceil(selected * this.props.perPage);
    console.log("the offset is:"+offset)
    this.setState({offset: offset}, () => {
      {this.props.item}
    });
  }

  toggleFavorite(Books){

    if(this.isBookInFavorites(Books)){
      this.removeFromFavorites(Books);
    }
    else{
      this.addToFavorites(Books);
    }

  }

  addToFavorites(Books){

    var favorites = this.state.favorites;

    favorites.push({
      Books: Books,
      timestamp: Date.now()
    });

    this.setState({
      favorites: favorites
    });

    localStorage.favorites = JSON.stringify(favorites);
  }

  removeFromFavorites(Books){

    var favorites = this.state.favorites;
    var index = -1;

    for(var i = 0; i < favorites.length; i++){

      if(favorites[i].Books == Books){
        index = i;
        break;
      }

    }
  }
  isBookInFavorites(Books){

    var favorites = this.state.favorites;

    for(var i = 0; i < favorites.length; i++){

      if(favorites[i].Books == Books){
        return true;
      }

    }
    return false;
  }

  render () {
    const pages = Math.ceil(
      this.state.items.length / page_size
    );
    console.log("length:"+this.state.items.length);
    console.log(pages);
    var books = [];
    var content;

    books = this.state.items.map(function(book) {
      return <Books key={book.id} item={book.volumeInfo} identifier={book.id}  
    />;

    });

    if (books.length > 0) {
      content = books;
    } else {
      content = <div className="search-icon" ><span className="glyphicon glyphicon-search"></span></div>
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        <AppBar title="Book Search using React with Material UI"/>
        <Header localSubmit={this.localSubmit}/>
          <div className="main">
    				<div id="bookshelf" className="bookshelf">
              {content}
            </div>
            <div className="text-center">
              <ReactPaginate previousLabel={"previous"}
                   nextLabel={"next"}
                   breakLabel={<a href="">...</a>}
                   breakClassName={"break-me"}
                   pageCount={this.state.pageCount}
                   marginPagesDisplayed={2}
                   pageRangeDisplayed={3}
                   onPageChange={this.handlePageClick}
                   containerClassName={"pagination"}
                   subContainerClassName={"pages pagination"}
                   activeClassName={"active"} />
            </div>
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );

  }

}

ReactDOM.render(<Main  perPage={10}/>, document.getElementById("app"));

