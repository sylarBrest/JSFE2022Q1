import { EmptyStringFn } from '../types';

const renderFooter: EmptyStringFn = (): string => `
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-data">
        <span class="copy-year">© 2022</span>
        <span class="github">
          <a class="github-link" href="https://github.com/sylarBrest" target="_blank" rel="noopener noreferrer">sylarBrest</a>
        </span>
      </div>
      <a class="rss-logo" href="https://rs.school/js-stage0/" target="_blank" rel="noopener noreferrer" title="Rolling Scope School"></a>
    </div>
  </footer>
`;

export default renderFooter;
