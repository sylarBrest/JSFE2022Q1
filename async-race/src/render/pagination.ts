import { EmptyStringFn } from '../types';

const renderPaginationButtonsContainer: EmptyStringFn = (): string => `
  <div class="pagination">
    <button class="button prev-button">Prev</button>
    <button class="button next-button">Next</button>
  </div>
`;

export default renderPaginationButtonsContainer;
