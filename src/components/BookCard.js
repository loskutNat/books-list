import React from 'react';
import { BOOK_STAGES } from '../utils/common';
import TagsList from './TagsList';

function BookCard({ book, onBookStageChange, onFilterByTag }) {
  const buttonTitle = () => {
    switch (book.stage) {
      case undefined:
        return 'start reading';
      case BOOK_STAGES.IN_PROGRESS:
        return 'finish reading';
      case BOOK_STAGES.FINISHED:
        return 'return in "to read"';
      default:
        return null;
    }
  };

  return (
    <div className="book-card">
      <p>{book.author}</p>
      <div className="book-card__title-line">
        <h3 className="book-card__title">{book.title}</h3>
        <button
          type="button"
          data-icon={book.stage === BOOK_STAGES.FINISHED ? ' ↲' : ' →'}
          onClick={() => onBookStageChange(book)}
          className="book-card__change-state"
        >
          <span className="book-card__change-state-text">{buttonTitle()}</span>
        </button>
      </div>
      <p>{book.description}</p>
      <div className="book-card__tags-list">
        <TagsList tags={book.tags} onFilterByTag={onFilterByTag} />
      </div>
    </div>
  );
}

export default BookCard;
