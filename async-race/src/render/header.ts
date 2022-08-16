import { EmptyStringFn } from '../types';

const renderHeader: EmptyStringFn = (): string => `
  <header class="header">
    <div class="container header-container">
    <div class="header-logo"></div>
    <h1 class="header-name">Async Race</h1></div>
  </header>
`;

export default renderHeader;
