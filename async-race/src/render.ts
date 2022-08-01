export function renderHeader(): string {
  return `
    <header class="header">
      <div class="container header-container">
      <div class="header-logo"></div>
      <h1 class="header-name">Async Race</h1></div>
    </header>`;
}

export function renderViewSwitch(): string {
  return `
    <div class="view-switch">
      <button class="button garage-button">To garage</button>
      <button class="button winners-button">To winners</button>
    </div>
  `;
}

export function renderMain(): string {
  return `
    <main class="main">
      <div class="container main-container">
        ${renderViewSwitch()}
      </div>
    </main>`;
}

export function renderFooter(): string {
  return `
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
  </footer>`;
}
