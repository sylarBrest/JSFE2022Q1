import { EmptyStringFn } from '../types';

const renderViewSwitch: EmptyStringFn = (): string => `
  <div class="view-switch">
    <button class="button garage-button" disabled>To garage</button>
    <button class="button winners-button">To winners</button>
  </div>
`;

export default renderViewSwitch;
