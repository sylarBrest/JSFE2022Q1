import '../../assets/svg/favicon.svg';

export default function setFavicon(): void {
  let headTitle: HTMLHeadElement | null = document.querySelector('head');
  let setFavicon: HTMLLinkElement = document.createElement('link');
  setFavicon.setAttribute('rel','icon');
  setFavicon.setAttribute('href', './assets/favicon.svg');
  if (headTitle) headTitle.appendChild(setFavicon);
}
