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
          locale: 'en-US',
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
          error: {
            emailLength: 'Email must be at least 3 characters long',
            login: 'An error occurred during login. Please try again.',
          },
          checkoutSuccess: 'Checkout successful!',
          checkoutError: 'Checkout failed. Please try again.',
          removeAll: 'Remove all',
          newOrder: 'New order',
        },
      },
      cs: {
        translation: {
          locale: 'cs-CZ',
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
          error: {
            emailLength: 'E-mail musí mít alespoň 3 znaky',
            login: 'Došlo k chybě při přihlašování. Zkuste to prosím znovu.',
          },
          checkoutSuccess: 'Úspěšně zakoupeno!',
          checkoutError: 'Nákup se nezdařil. Zkuste to prosím znovu.',
          removeAll: 'Odebrat vše',
          newOrder: 'Nová objednávka',
        },
      },
    },
  })

export default i18n
