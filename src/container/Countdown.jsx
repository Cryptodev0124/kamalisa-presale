import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import bracketLeft from '../icons/bracket0.svg'
import bracketRight from '../icons/bracket1.svg'

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const calculateTimeLeft = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const utcNow = Date.now()
    // futureDate defines the date and time the countdown will taget, set it as needed
    // It will never go negative, and if countdown finished, it will stop at zero
    const futureDate = new Date('2024-09-05T00:00:00Z')
    const difference = utcNow - futureDate.getTime()

    var days = 0
    var hours = 0
    var minutes = 0
    var seconds = 0
    if(difference < 0) {
      days = Math.abs(Math.floor(difference / (1000 * 60 * 60 * 24) + 1))
      hours = Math.abs(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + 1)
      )
      minutes = Math.abs(
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60) + 1)
      )
      seconds = Math.abs(Math.floor((difference % (1000 * 60)) / 1000 + 1))
    }

    setTimeLeft({ days, hours, minutes, seconds })
  }

  useEffect(() => {
    calculateTimeLeft()
    const interval = setInterval(() => calculateTimeLeft(), 1000)
    return () => clearInterval(interval)
  }, [])
  const { t, i18n } = useTranslation()
  // Uncomment .padStart(2, "0") to add a leading zero to a single digit,
  // so for example it would show "06" instead of "6"
  const formattedDays = timeLeft.days.toString().padStart(2, '0')
  const formattedHours = timeLeft.hours.toString().padStart(2, '0')
  const formattedMinutes = timeLeft.minutes.toString().padStart(2, '0')
  const formattedSeconds = timeLeft.seconds.toString().padStart(2, '0')

  return (
    <section className="countdownContainer">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* <img src={bracketLeft} alt="Bracket Left" /> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {/* <h2
            style={{
              color: 'rgb(231, 141, 36)',
              fontFamily: 'monospace',
              fontSize: '18px',
              textAlign: 'center',
              marginTop: '-6px'
            }}
          >
            {t('main.untilNextPrice')}
          </h2> */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'left',
              marginTop: '1rem',
              height: '70px',
              width: '280px',
              justifyContent: 'space-evenly'
            }}
          >
            <div className='counterItem'>
              <div className="countdown">
                <span>
                  <b>{formattedDays}</b>
                </span>
              </div>
              <div className="countdown-sub">{t('Days')}</div>
            </div>

            <div className='counterItem'>
              <div className="countdown">
                <span>
                  <b>{formattedHours}</b>
                </span>
              </div>
              <div className="countdown-sub">{t('Hours')}</div>
            </div>

            <div className='counterItem'>
              <div className="countdown">
                <span>
                  <b>{formattedMinutes}</b>
                </span>
              </div>
              <div className="countdown-sub">{t('Min')}</div>
            </div>

            <div className='counterItem'>
              <div className="countdown">
                <span>
                  <b>{formattedSeconds}</b>
                </span>
              </div>
              <div className="countdown-sub">{t('Sec')}</div>
            </div>
          </div>
        </div>
        {/* <img src={bracketRight} alt="Bracket Right" /> */}
      </div>
    </section>
  )
}
export default Countdown
