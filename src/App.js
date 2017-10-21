import React from 'react'
import './App.css'
import HomePage from "./HomePage";
import * as BooksApi from "./BooksAPI";
import {Route} from 'react-router-dom'
import SearchPage from "./SearchPage";


class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: []
    }


    componentDidMount() {
        BooksApi.getAll().then((books) => {
            this.setState({books})
        })
    }

    moveBookToNewShelf = (book, oldShelf, newShelf) => {
        const {books} = this.state;
        const newBook = {...book, shelf: newShelf};

        const updatedCatalog = books.filter(b => b.id !== book.id).concat(newBook);

        this.setState({books: updatedCatalog});

        BooksApi.update(book, newShelf);

    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <HomePage books={this.state.books} moveBook={this.moveBookToNewShelf}/>
                )}/>
                <Route path='/search' render={({history}) => (
                    <SearchPage
                        books={this.state.books}
                        moveBook={this.moveBookToNewShelf}
                        dismiss={() => {
                            history.push('/')
                        }}

                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
