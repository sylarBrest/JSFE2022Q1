import {
  ESortingBy,
  ESortingOrder,
  SortBy,
  SpecifiedPromiseFn,
} from '../types';
import storage from '../storage';
import { renderWinners } from '../render/index';
import { updateWinnersView } from './updateViews';

const sortWinners: SpecifiedPromiseFn<SortBy, void> = async (sortBy: SortBy): Promise<void> => {
  const prevSortBy: SortBy = storage.sortBy;
  storage.sortBy = sortBy;

  switch (storage.sortBy) {
    case ESortingBy.id:
      break;
    default: {
      if (prevSortBy === storage.sortBy) {
        storage.sortOrder = storage.sortOrder === ESortingOrder.asc
          ? ESortingOrder.desc
          : ESortingOrder.asc;
      } else {
        storage.sortOrder = ESortingOrder.asc;
      }
    }
  }

  await updateWinnersView();

  document.getElementsByClassName('winners')[0].innerHTML = renderWinners();
};

export default sortWinners;
