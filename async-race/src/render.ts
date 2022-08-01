export function renderHeader(): string {
  return `
    <header class="header">
      <div class="container header-container">
      <div class="header-logo"></div>
      <h1 class="header-name">Async Race</h1></div>
    </header>`;
}

function renderViewSwitch(): string {
  return `
    <div class="view-switch">
      <button class="button garage-button">To garage</button>
      <button class="button winners-button">To winners</button>
    </div>`;
}

function renderCreateCarContainer(): string {
  return `
    <div class="create-car">
      <input class="text-input create-car-text" type="text">
      <input class="color-input update-car-color" type="color" value="#ffffff">
      <button class="button create-car-button">Create</button>
    </div>`;
}

function renderUpdateCarContainer(): string {
  return `
    <div class="update-car">
      <input class="text-input update-car-text" type="text" disabled>
      <input class="color-input update-car-color" type="color" value="#ffffff" disabled>
      <button class="button update-car-button" disabled>Update</button>
    </div>`;
}

function renderControlButtonsContainer(): string {
  return `
    <div class="control-buttons">
      <button class="button race-button">Race</button>
      <button class="button reset-button">Reset</button>
      <button class="button generate-cars-button">Generate cars</button>
    </div>`;
}

function renderTrack(): string {
  return `
    <div class="track">
    </div>`;
}

function renderPaginationButtonsContainer(): string {
  return `
    <div class="pagination">
      <button class="button prev-button" disabled>Prev</button>
      <button class="button next-button" disabled>Next</button>
    </div>`;
}

export function renderGarageView(): string {
  return `
    <section class="view garage-view">
      <div class="controls">
        ${renderCreateCarContainer()}
        ${renderUpdateCarContainer()}
        ${renderControlButtonsContainer()}
      </div>
      <div class="garage">
        <h2 class="title">Garage (0)</h2>
        <h3 class="page">Page #1</h3>
        ${renderTrack()}
      </div>
      ${renderPaginationButtonsContainer()}
    </section>`;
}

export function renderMain(): string {
  return `
    <main class="main">
      <div class="container main-container">
        ${renderViewSwitch()}
        ${renderGarageView()}
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
