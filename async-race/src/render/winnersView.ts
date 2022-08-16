import { EmptyStringFn } from '../types';
import renderWinners from './winners';
import renderPaginationButtonsContainer from './pagination';

const renderWinnersView: EmptyStringFn = (): string => `
  <section class="view winners-view">
    <div class="winners">
      ${renderWinners()}
    </div>
    ${renderPaginationButtonsContainer()}
  </section>
`;

export default renderWinnersView;
