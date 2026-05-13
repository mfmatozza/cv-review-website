import { test, expect } from '@playwright/test'

test('landing page renders all 8 sections', async ({ page }) => {
  await page.goto('/')

  // Nav
  await expect(page.locator('nav')).toBeVisible()
  await expect(page.locator('nav').getByText('cv_builder')).toBeVisible()

  // Hero
  await expect(page.locator('#hero')).toBeVisible()
  await expect(page.getByRole('link', { name: /Build my CV/i }).first()).toBeVisible()

  // Problem section
  await expect(page.locator('#problem')).toBeVisible()

  // Features / How it Works
  await expect(page.locator('#features')).toBeVisible()
  await expect(page.getByText('Three steps to a perfect CV.')).toBeVisible()

  // CV preview
  await expect(page.locator('#templates')).toBeVisible()

  // Pricing — correct prices
  await expect(page.locator('#pricing')).toBeVisible()
  await expect(page.getByText('$0')).toBeVisible()
  await expect(page.getByText('$9')).toBeVisible()
  await expect(page.getByText('per month')).toBeVisible()

  // FAQ
  await expect(page.locator('#faq')).toBeVisible()
  await expect(page.getByText('Do I need to know LaTeX?')).toBeVisible()

  // CTA footer
  await expect(page.locator('#cta')).toBeVisible()
  await expect(page.getByText(/ready_to_build/)).toBeVisible()
})

test('FAQ accordion opens on click', async ({ page }) => {
  await page.goto('/')
  await page.locator('#faq').scrollIntoViewIfNeeded()

  const question = page.getByText('Do I need to know LaTeX?')
  await question.click()

  await expect(page.getByText('No. We handle all the LaTeX.')).toBeVisible()
})

test('pricing CTA links point to /onboarding', async ({ page }) => {
  await page.goto('/')
  await page.locator('#pricing').scrollIntoViewIfNeeded()

  const freeBtn = page.getByRole('link', { name: 'Get started' })
  await expect(freeBtn).toHaveAttribute('href', '/onboarding')

  const proBtn = page.getByRole('link', { name: 'Go Pro →' })
  await expect(proBtn).toHaveAttribute('href', '/onboarding?plan=pro')
})
