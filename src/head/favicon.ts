export function setFavicons(favImg: string): void {
  let headTitle: HTMLHeadElement | null = document.querySelector('head');
  let setFavicon: HTMLLinkElement = document.createElement('link');
  setFavicon.setAttribute('rel','shortcut icon');
  setFavicon.setAttribute('href',favImg);
  if (headTitle) headTitle.appendChild(setFavicon);
}
