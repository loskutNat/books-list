import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  useQuery,
  tagModifyForQuery,
  tagModifyFromQuery,
  BOOK_STAGES,
} from '../utils/common';
import Header from './Header';
import BookCard from './BookCard';
import FilterBox from './FilterBox';

const { useState, useEffect } = React;

const ls = window.localStorage;
let booksInProgress = ls.getItem(BOOK_STAGES.IN_PROGRESS)
  ? ls.getItem(BOOK_STAGES.IN_PROGRESS).split(',')
  : [];
let booksFinished = ls.getItem(BOOK_STAGES.FINISHED)
  ? ls.getItem(BOOK_STAGES.FINISHED).split(',')
  : [];

function BookList({ customClass }) {
  const [books, setBooks] = useState([]);
  const query = useQuery();
  const history = useHistory();
  const filterTags = query.get('tags') ? query.get('tags').split(',') : [];
  const filterTagsModifiedFromQuery = filterTags.map((filterTag) =>
    tagModifyFromQuery(filterTag)
  );
  let classNames = 'books-list';
  if (customClass) {
    classNames += ` ${customClass}`;
  }

  const fetchBooks = async () => {
    const res = await fetch(
      'https://raw.githubusercontent.com/loskutNat/books-list/master/data/data.json'
    );
    const data = await res.json();
    return data.items;
  };

  useEffect(() => {
    const getBooks = async () => {
      let booksData = await fetchBooks();
      booksData = booksData.map((book) => {
        if (booksInProgress.some((id) => book.id === id)) {
          return { ...book, stage: BOOK_STAGES.IN_PROGRESS };
        }
        if (booksFinished.some((id) => book.id === id)) {
          return { ...book, stage: BOOK_STAGES.FINISHED };
        }
        return book;
      });
      setBooks(booksData);
    };

    getBooks();
  }, []);

  const onBookStageChange = (book) => {
    const changedBooks = books.map((bookItem) => {
      const modifiedBookItem = { ...bookItem };
      if (bookItem.id === book.id) {
        switch (bookItem.stage) {
          case undefined:
            modifiedBookItem.stage = BOOK_STAGES.IN_PROGRESS;
            booksInProgress.push(book.id);
            ls.setItem(BOOK_STAGES.IN_PROGRESS, booksInProgress.join(','));
            break;
          case BOOK_STAGES.IN_PROGRESS:
            modifiedBookItem.stage = BOOK_STAGES.FINISHED;
            booksInProgress = booksInProgress.filter(
              (bookId) => bookId !== book.id
            );
            ls.setItem(BOOK_STAGES.IN_PROGRESS, booksInProgress.join(','));
            booksFinished.push(book.id);
            ls.setItem(BOOK_STAGES.FINISHED, booksFinished.join(','));
            break;
          case BOOK_STAGES.FINISHED:
            delete modifiedBookItem.stage;
            booksFinished = booksFinished.filter(
              (bookId) => bookId !== book.id
            );
            ls.setItem(BOOK_STAGES.FINISHED, booksFinished.join(','));
            break;
          default:
            break;
        }
      }
      return modifiedBookItem;
    });
    setBooks(changedBooks);
  };

  const getBooksByQueries = () =>
    books
      .filter((book) => {
        if (!query.get('tab')) {
          return !book.stage;
        }
        return query.get('tab') === book.stage;
      })
      .filter((book) => {
        if (!filterTags.length) {
          return book;
        }
        return filterTags.every(
          (tag) =>
            book.tags
              .map((tagName) => tagModifyForQuery(tagName))
              .indexOf(tag) !== -1
        );
      });

  const booksByQueries = getBooksByQueries();

  const onClearTagsFilter = () => {
    query.delete('tags');
    history.push(`/?${query.toString()}`);
  };

  const onFilterByTag = (tag) => {
    const tagsByQuery = query.get('tags');
    if (tagsByQuery && tagsByQuery.indexOf(tagModifyForQuery(tag)) !== -1) {
      return;
    }
    if (tagsByQuery) {
      let result = tagsByQuery;
      query.delete('tags');
      result = `${result},${tagModifyForQuery(tag)}`;
      query.append('tags', result);
    } else {
      query.append('tags', tagModifyForQuery(tag));
    }
    history.push(`/?${query.toString()}`);
  };

  const onBooksCount = () => ({
    toRead: books.length
      ? books.length - booksInProgress.length - booksFinished.length
      : 0,
    inProgress: booksInProgress.length,
    finished: booksFinished.length,
  });

  return (
    <div className={classNames}>
      <Header booksCount={onBooksCount()} customClass="books-list__header" />
      {filterTags.length ? (
        <FilterBox
          onClearTagsFilter={onClearTagsFilter}
          tags={filterTagsModifiedFromQuery}
        />
      ) : (
        ''
      )}
      <div className="books">
        {booksByQueries.length ? (
          booksByQueries.map((book) => (
            <BookCard
              book={book}
              onFilterByTag={onFilterByTag}
              onBookStageChange={onBookStageChange}
              key={book.id}
            />
          ))
        ) : (
          <div className="books__zero-state">
            <p>List is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookList;
