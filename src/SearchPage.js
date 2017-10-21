import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'
import Book from "./Book";
import Shelfs from "./shelfs";


class SearchPage extends React.Component {
    static propTypes = {
        dismiss: PropTypes.func.isRequired,
        moveBook: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired

    }

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            numResults: 10,
            loading: false,
            bookMap: this.getBookMap(this.props.books)

        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.books !== this.props.books) {
            const newMap = this.getBookMap(newProps.books);
            this.setState({bookMap: newMap})
        }

    }


    getBookMap = (books) => {
        books = books || [];
        const bookMap = {};

        books.forEach((b) => bookMap[b.id] = b.shelf);
        return bookMap
    }


    updateQuery = (query) => {
        query = query.trim();


        if (query) {
            this.setState({loading: true, query: query});
            const bookPromise = BooksAPI.search(query, this.state.numResults);
            bookPromise.then((booksRes) => {
                    let searchResBooks = booksRes["error"] ? [] : booksRes;
                    const {bookMap} = this.state;

                    searchResBooks = searchResBooks.map((b) => {
                        const shelf = bookMap[b.id] || Shelfs.NONE;
                        return {...b, shelf: shelf}

                    });


                    this.setState({books: searchResBooks, loading: false});
                }
            );
        } else {
            this.setState({books: [], query: query});
        }


    }


    renderBook = (book) => {
        return (
            <li key={book.id}>
                <Book book={book} moveBook={this.props.moveBook}/>
            </li>
        )
    }

    renderBooks = () => {
        const {query, books, loading} = this.state;

        if (query) {
            if (loading) {
                return (<p>Loading</p>)
            } else {
                if (books && books.length > 0) {
                    return (
                        <ol className="books-grid">
                            {
                                books.map((b) => this.renderBook(b))
                            }
                        </ol>
                    )
                } else {
                    return (<p>No books found for {query} :(</p>)
                }
            }

        } else {
            return (<p>Please Enter Something</p>)
        }


    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.props.dismiss}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author"
                               onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    {this.renderBooks()}
                </div>


            </div>




        )
    }

}

export default SearchPage