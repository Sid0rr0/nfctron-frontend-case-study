import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          checkoutNow: 'Checkout now',
          checkout: 'Checkout',
          noTickets: 'No tickets selected',
          fillOutTheInfo: 'Please fill out the information below',
          totalTickets: 'Total number of tickets:',
          email: 'Email',
          firstName: 'First name',
          lastName: 'Last name',
          password: 'Password',
          login: 'Login',
          logout: 'Logout',
          send: 'Send',
          validating: 'Validating...',
          seatRow: 'Row',
          seatNumber: 'Seat number',
          ticketType: 'Type',
          price: 'Price',
          currency: 'CZK',
          addToCart: 'Add to cart',
          removeFromCart: 'Remove from cart',
          addToCalendar: 'Add to calendar',
        },
      },
      cs: {
        translation: {
          checkoutNow: 'Pokračovat k pokladně',
          checkout: 'Pokladna',
          noTickets: 'Žádné lístky nejsou vybrány',
          fillOutTheInfo: 'Vyplňte prosím níže uvedené informace',
          totalTickets: 'Celkem počet lístků:',
          email: 'E-mail',
          firstName: 'Jméno',
          lastName: 'Příjmení',
          password: 'Heslo',
          login: 'Přihlásit se',
          logout: 'Odhlásit se',
          send: 'Odeslat',
          validating: 'Ověřování...',
          seatRow: 'Řada',
          seatNumber: 'Číslo sedadla',
          ticketType: 'Typ',
          price: 'Cena',
          currency: 'Kč',
          addToCart: 'Přidat do košíku',
          removeFromCart: 'Odebrat z košíku',
          addToCalendar: 'Přidat do kalendáře',
        },
      },
    },
  })

export default i18n
