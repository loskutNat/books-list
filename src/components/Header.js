import React from 'react';
import { NavLink } from 'react-router-dom';
import { BOOK_STAGES } from '../utils/common';

function Header({ booksCount, customClass }) {
  let classNames = 'header';
  if (customClass) {
    classNames += ` ${customClass}`;
  }
  return (
    <header className={classNames}>
      <nav className="header__navigation">
        <NavLink
          to="/"
          isActive={(match, location) =>
            !(
              location.search.indexOf(BOOK_STAGES.IN_PROGRESS) !== -1 ||
              location.search.indexOf(BOOK_STAGES.FINISHED) !== -1
            )
          }
          activeClassName="header__navigation-link--active"
          className="header__navigation-link"
        >
          To read ({booksCount.toRead})
        </NavLink>
        <NavLink
          to="/?tab=inprogress"
          isActive={(match, location) =>
            location.search.indexOf(BOOK_STAGES.IN_PROGRESS) !== -1
          }
          activeClassName="header__navigation-link--active"
          className="header__navigation-link"
        >
          In progress ({booksCount.inProgress})
        </NavLink>
        <NavLink
          to="/?tab=finished"
          isActive={(match, location) =>
            location.search.indexOf(BOOK_STAGES.FINISHED) !== -1
          }
          activeClassName="header__navigation-link--active"
          className="header__navigation-link"
        >
          Done ({booksCount.finished})
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
