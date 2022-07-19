import './footer.scss';

interface Footer {
  drawFooter(): void;
}

class Footer implements Footer {
  public drawFooter(): void {
    const footerContainer: HTMLDivElement = document.createElement('div');
    footerContainer.classList.add('container', 'footer-container');

    const footerData: HTMLDivElement = document.createElement('div');
    footerData.className = 'footer-data';

    const copyYearData: HTMLSpanElement = document.createElement('span');
    copyYearData.className = 'copy-year';
    copyYearData.textContent = '\u00A9 2022';

    const githubData: HTMLSpanElement = document.createElement('span');
    githubData.className = 'github';

    const linkGithub: HTMLAnchorElement = document.createElement('a');
    linkGithub.className = 'github-link';
    linkGithub.setAttribute('href', 'https://github.com/sylarBrest');
    linkGithub.setAttribute('target', '_blank');
    linkGithub.setAttribute('rel', 'noopener noreferrer');
    linkGithub.textContent = 'sylarBrest';

    githubData.append(linkGithub);

    footerData.append(copyYearData, githubData);

    const linkRSS: HTMLAnchorElement = document.createElement('a');
    linkRSS.className = 'rss-logo';
    linkRSS.setAttribute('href', 'https://rs.school/js-stage0/');
    linkRSS.setAttribute('target', '_blank');
    linkRSS.setAttribute('rel', 'noopener noreferrer');
    linkRSS.setAttribute('title', 'Rolling Scope School');

    footerContainer.append(footerData, linkRSS);

    document.getElementsByClassName('footer')[0].append(footerContainer);
  }
}

export default Footer;
