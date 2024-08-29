import React from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'
import BLAM from '../icons/TokenLogo.png'
import footerTelegramIcon from '../icons/footer-telegram.svg'
import footerInstagramIcon from '../icons/instagram.svg'
import footerXIcon from '../icons/footer-x.svg'
// import footerGithubIcon from '../icons/footer-github.svg'
// import footerEmailIcon from '../icons/footer-email.svg'
// import solidProof from '../icons/solidProof.webp'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <section className="footer">
      <div className="footer-background-container" />
      <div className="mainWrapper">
        <div className="footerLogoContainer">
          <img
            src={BLAM}
            width="48px"
            height="48"
            className="footerLogo"
            alt="BLAM"
          />
        </div>
        <div>
          <div className="footer-row">
            <div className="socials-row">
              <a href="https://twitter.com/bitcoinlamas" className="socialIcon">
                <img src={footerXIcon} alt="X" />
              </a>
              <a href="https://t.me/bitcoinlamas" className="socialIcon">
                <img src={footerTelegramIcon} alt="Telegram" />
              </a>
              <a
                href="https://www.instagram.com/bitcoinlamas"
                className="socialIcon"
              >
                <img
                  src={footerInstagramIcon}
                  width="48px"
                  className="footerInstagram"
                  alt="Instagram"
                />
              </a>
              {/* <a href="mailto:admin@example.com" className="socialIcon">
                <img src={footerEmailIcon} />
              </a>
              <a href="https://github.com" className="socialIcon">
                <img src={footerGithubIcon} />
              </a> */}
              {/* <a href="https://solidproof.io" style={{ marginLeft: '30px' }}>
                <img src={solidProof} />
              </a> */}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div>
          <div className="whitelist-row">
            <div className="footer-buttons">
              <a href="/terms" className="footerButton">
                {t('main.terms')}
              </a>
              <a href="privacy" className="footerButton">
                {t('main.privacy')}
              </a>
            </div>
            <div className="socials-row">
              <p className="footerText">{t('main.footerCopyright')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
