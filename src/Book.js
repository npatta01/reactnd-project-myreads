import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        moveBook: PropTypes.func.isRequired
    }

    onMove = (newShelf) => {
        const {book, moveBook} = this.props;

        moveBook(book, book.shelf, newShelf);

        //this.setState({value: event.target.value});
    }

    render() {
        const {title, authors, imageLinks, shelf} = this.props.book;
        const author = authors ? authors.join(", ") : "";
        const imageUrl = imageLinks['thumbnail'];


        return (

            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 192,
                        backgroundImage: `url(${imageUrl})`
                    }}></div>
                    {/*
                    <div className="book-read-status">Status:{shelf}</div>
*/}

                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={(event) => this.onMove(event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
            </div>


        )


    }
}

export default Book