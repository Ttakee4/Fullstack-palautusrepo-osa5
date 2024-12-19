/* eslint-disable linebreak-style */
//En saanut linttiä toimimaan täällä tiedostossa, joten estetään linebreak-style valitus
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Kova Ukko',
        username: 'kovaukko',
        password: 'salaisuus'
      }
    })

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    // ...
  })
})