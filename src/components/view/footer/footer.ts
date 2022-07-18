import './footer.scss';

interface Footer {
  drawFooter(): void;
}

class Footer implements Footer {
  public drawFooter(): void {
    const footerContainer = document.createElement('div');
    footerContainer.classList.add('container', 'footer-container');

    const footerData = document.createElement('div');
    footerData.className = 'footer-data';

    const copyYearData = document.createElement('span');
    copyYearData.className = 'copy-year';
    copyYearData.textContent = '\u00A9 2022';

    const githubData = document.createElement('span');
    githubData.className = 'github';

    const linkGithub = document.createElement('a');
    linkGithub.className = 'github-link';
    linkGithub.setAttribute('href', 'https://github.com/sylarBrest');
    linkGithub.setAttribute('target', '_blank');
    linkGithub.setAttribute('rel', 'noopener noreferrer');
    linkGithub.textContent = 'sylarBrest';

    githubData.append(linkGithub);

    footerData.append(copyYearData, githubData);

    const linkRSS = document.createElement('a');
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
