import React from 'react'
import PropTypes from 'prop-types'
import BookShelf from "./BookShelf";
import Shelfs from "./shelfs";
import {Link} from 'react-router-dom'

class HomePage extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired
    }

    render() {

        const {books, moveBook} = this.props;
        const currentlyReading = books.filter((b) => b.shelf === Shelfs.CURRENTLY_READING);
        const wantToRead = books.filter((b) => b.shelf === Shelfs.WANT_TO_READ);
        const read = books.filter((b) => b.shelf === Shelfs.READ);

        return (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf title={"Currently Reading"} books={currentlyReading} key={Shelfs.CURRENTLY_READING}
                                   moveBook={moveBook}/>
                        <BookShelf title={"Want to Read"} books={wantToRead} key={Shelfs.WANT_TO_READ}
                                   moveBook={moveBook}/>
                        <BookShelf title={"Read"} books={read} key={Shelfs.READ} moveBook={moveBook}/>

                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                    >Add a book</Link>
                </div>
            </div>

        )
    }

}

export default HomePage