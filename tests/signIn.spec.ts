import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Sign in').click()

});

test.describe('Sign In Form', () => {

    test('Sign in without email', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').focus()
        await page.locator('//input[@id="signinEmail"]').blur()
        await expect(page.locator('//div[@class="invalid-feedback"]').first()).toHaveText('Email required')

    });

    test('Sign in without password', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('test1@gmail.com')
        await page.locator('//input[@id="signinPassword"]').focus()
        await page.locator('//input[@id="signinPassword"]').blur()
        await expect(page.locator('//div[@class="invalid-feedback"]').last()).toHaveText('Password required')
    })

    test('Sign in with invalid email', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('test')
        await page.locator('//input[@id="signinPassword"]').focus()
        await expect(page.locator('//div[@class="invalid-feedback"]//p'), 'Email should not be valid').toHaveText('Email is incorrect')
    })

    test('Sign in with incorrect credentials', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('fafe@gmail.com')
        await page.locator('//input[@id="signinPassword"]').fill('nvnbnbf')
        await page.getByText('Login').click();
        await expect(page.locator('//p[contains(@class, "alert-danger")]')).toHaveText('Wrong email or password')

    })

    test('Sign in with correct credentials', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('michael.krasnovskyi+testUser1@gmail.com')
        await page.locator('//input[@id="signinPassword"]').fill('ZSgeVQhuU3qkvlG')
        await page.getByText('Login').click()

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
        await expect(page).toHaveTitle('Hillel Qauto')
        await expect(page.locator('//app-garage')).toHaveScreenshot('Garage_one_car.png')

    })

})
