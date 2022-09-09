import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'react-native-localize'

import * as resources from './locale/*.js'

var deviceLanguage = 'en'
const currentLocale = getLocales()[0]

deviceLanguage = currentLocale.languageCode === 'zh' ? 'zh' : deviceLanguage

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: deviceLanguage,
        fallbackLng: deviceLanguage,
        resources,
        interpolation: {
            escapeValue: false,
        },
        ns: ['common'],
        defaultNS: 'common',
    })
