// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  app: {
    head: {
      title: 'E-commerce CMS',
      meta: [
        { name: 'description', content: 'E-commerce CMS Backoffice' }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})