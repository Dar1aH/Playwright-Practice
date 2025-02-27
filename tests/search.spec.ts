import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');

});

test.describe('Search', () => {

    test('locator', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
        //with xpath locator
        await expect(page.locator('//h1')).toBeVisible()

        await expect(page.locator('h1')).toHaveText('Do more!')
    });

    test('getByRole', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Do more!' })).toBeVisible();

    })

    test('getByText', async ({ page }) => {
        await page.getByText('Sign In').click()

    })

    test('getByLabel', async ({ page }) => {
        await page.getByText('Sign In').click()
        await page.getByLabel('Email').fill('test')

    })

    test('has', async ({ page }) => {
        await expect(page.locator('//div', { has: page.locator('//a[@routerlinkactive="-active"]') })).toBeVisible()

    })

    test('hasText, hasNotText', async ({ page }) => {
        await expect(page.locator('//button', { hasText: 'About' })).toBeVisible()
        await expect(page.locator('//button', { hasNotText: 'About' })).toBeVisible()

    })

    test('hasNot', async ({ page }) => {
        await expect(page.locator('//div', { hasNot: page.locator('//a[@routerlinkactive="-active"]') })).toBeVisible()

    })

    test('Multiple elements', async ({ page }) => {
        const icons = page.locator('//a[@class="socials_link"]');
        //Get the number of icons
        const iconsCount = await icons.count();
        console.log('iconsCount:'+ iconsCount)

        // Clicking icons one by one --> 

        // for(let i = 0; i < iconsCount; i++){
        //     await icons.nth(i).click();
        // }

        // for(const icon of await icons.all()) {
        //     await icon.click()
        // }

        //Clicking the first and last icons out of all icons found
        
        await icons.first().click()
        await icons.last().click()
    })
})
