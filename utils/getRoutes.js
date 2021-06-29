
// utils/getRoutes.js
// const axios = require('axios')
// const dotenv = require('dotenv').config()
// const appRoutes = require('../routes.json');

// module.exports = async function getAppRoutes() {
module.exports = function getAppRoutes() {
  const baseRoutes = ['/', '/hu']
  const routes = baseRoutes.map((entry) => {
    return {
      url: entry,
      changefreq: 'weekly',
      priority: 1,
      lastmodISO: new Date().toISOString()
    }
  })
  return routes
  /*
    const baseRoutes = ['/hu/', '/en/', '/hu/projects/', '/en/projects/', '/hu/team/', '/en/team/', '/hu/services/', '/en/services/'];
    const config = {
      locales: ['hu', 'en']
    }

    const routes = baseRoutes.map(entry => {
      return {
          url: entry,
          changefreq: 'weekly',
          priority: 1,
          lastmodISO: new Date().toISOString()
        }
    })

    for (const locale of config.locales) {
      let entries = await axios.get(`${process.env.BASE_URL}/projects/${locale}`)

      entries.data.forEach(entry => {
        // console.log(`sitemap route:      /${locale}/projects/${entry.id}`)
        routes.push(
          {
            url: `/${locale}/projects/${entry.id}`,
            changefreq: 'weekly',
            priority: 1,
            lastmodISO: new Date().toISOString()
          })
      })
    }

    return routes
    */
}
