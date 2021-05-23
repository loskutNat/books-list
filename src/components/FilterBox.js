import React from 'react';
import TagsList from './TagsList';

function FilterBox({ onClearTagsFilter, tags }) {
  return (
    <div className="filter-box">
      <p>
        <span>Filtered by tags:</span>&nbsp;
        <TagsList tags={tags} />
        &nbsp;
        <button
          type="button"
          onClick={onClearTagsFilter}
          className="filter-box__clear-btn"
        >
          (<span className="filter-box__clear-btn-text">clear</span>)
        </button>
      </p>
    </div>
  );
}

export default FilterBox;
