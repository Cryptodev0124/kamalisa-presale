import React from 'react'
import {
  Paper,
  Grid,
  Typography,
  Box,
  Zoom,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { useTranslation } from 'react-i18next'
import './i18n'
import BLAM from '../icons/kamalisa-sitelogo.png'
import footerTelegramIcon from '../icons/footer-telegram.svg'
import footerInstagramIcon from '../icons/instagram.svg'
import footerXIcon from '../icons/footer-x.svg'
// import footerGithubIcon from '../icons/footer-github.svg'
// import footerEmailIcon from '../icons/footer-email.svg'
// import solidProof from '../icons/solidProof.webp'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <Paper className="footer">
      <Grid className="footerLogoContainer">
        <Grid className='footer-logo'>
          <img
            src={BLAM}
            width="160px"
            height="48"
            className="footerLogo"
            alt="BLAM"
          />
        </Grid>
        <Grid className="footer-row">
          <div className="socials-row">
            <a href="https://x.com/KAMALISA47?t=O3Ojsl1aN0LeH0coQC3Xeg&s=09" className="socialIcon">
              <img src={footerXIcon} alt="X" style={{background: '#000000', borderRadius: '8px'}} />
            </a>
            <a href="hhttps://t.me/KAMALISA47" className="socialIcon">
              <img src={footerTelegramIcon} alt="Telegram" style={{background: '#000000', borderRadius: '8px'}} />
            </a>
            {/* <a
                href="https://www.instagram.com/bitcoinlamas"
                className="socialIcon"
              >
                <img src={footerInstagramIcon} width="36px" className="footerInstagram" alt="Instagram" />
              </a> */}
          </div>
        </Grid>
        <Grid className="whitelist-row">
          <div className="socials-row">
            <p className="footerText" style={{color: '#000000'}}>{t('main.footerCopyright')}</p>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Footer
