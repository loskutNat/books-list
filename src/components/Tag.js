import React from 'react';

function Tag({ tag, onFilterByTag, customClass }) {
  let classNames = 'filter-tag';
  if (customClass) {
    classNames += ` ${customClass}`;
  }

  const CustomTagName = onFilterByTag ? 'button' : 'span';
  const customAttrs = {};
  if (onFilterByTag) {
    customAttrs.type = 'button';
  }

  const onClick = () => {
    if (!onFilterByTag) {
      return;
    }
    onFilterByTag(tag);
  };

  return (
    <CustomTagName {...customAttrs} onClick={onClick} className={classNames}>
      #{tag}
    </CustomTagName>
  );
}

export default Tag;
