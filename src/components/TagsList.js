import React from 'react';
import Tag from './Tag';

function TagsList({ tags, onFilterByTag }) {
  return (
    <span className="tags-list">
      {tags.map((tag, index) => (
        <Tag
          key={`tags_item_${index}`}
          tag={tag}
          onFilterByTag={onFilterByTag}
          customClass="tags-list__item"
        />
      ))}
    </span>
  );
}

export default TagsList;
