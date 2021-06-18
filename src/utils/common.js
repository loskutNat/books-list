import { useLocation } from 'react-router-dom';

const BOOK_STAGES = {
  IN_PROGRESS: 'inprogress',
  FINISHED: 'finished',
};

function tagModifyForQuery(tag) {
  return tag.replace(/ /g, '_');
}

function tagModifyFromQuery(tag) {
  return tag.replace(/_/g, ' ');
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export { BOOK_STAGES, tagModifyForQuery, tagModifyFromQuery, useQuery };
