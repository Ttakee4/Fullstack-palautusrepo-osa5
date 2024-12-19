/* eslint-disable linebreak-style */
//En saanut linttiä toimimaan täällä tiedostossa, joten estetään linebreak-style valitus
const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('kovaukko')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(0, 0, 255)')

      await expect(page.getByText('Kova Ukko logged in')).not.toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'kovaukko', 'salaisuus')

      await expect(page.getByText('Kova Ukko logged in')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'kovaukko', 'salaisuus')

      await expect(page.getByText('Kova Ukko logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      // await createBlog(page, 'Kovat hommat', 'Kova Ukko', 'www.kovathommat.fi')

      // await expect(page.getByText('Kovat hommat')).toBeVisible()
    })
  })
})