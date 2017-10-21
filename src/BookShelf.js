import React from 'react'
import PropTypes from 'prop-types'
import Book from "./Book";

class BookShelf extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired
    }




    renderBook = (book) => {
        return (
            <li key={book.id}>
                <Book book={book}  moveBook={this.props.moveBook}/>
            </li>
        )
    }

    render() {
        const {title, books} = this.props;

        return (

            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                        {
                            books.map((b) => this.renderBook(b))
                        }

                    </ol>
                </div>
            </div>

        )
    }
}

export default BookShelf