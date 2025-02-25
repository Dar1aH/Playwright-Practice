import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage.ts';
import SignInForm from '../pom/forms/SignInForm.ts';
import GaragePage from '../pom/pages/GaragePage.ts';
import { credentials } from '../test-data/usersData.ts';


test.describe(('Mocking'), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test('Verify message when no cars added', async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        const fakeResponseBody = {
            "status": "ok",
            "data": []
        }

        await page.route('**/api/cars', route => route.fulfill({
            status: 200,
            body: JSON.stringify(fakeResponseBody)
        }))

        await homePage.open();
        await homePage.clickSignInButton();
        await signInForm.loginWithCredentials(credentials.userOne.email, credentials.userOne.password);
        await expect(page.getByText('You don’t have any cars in your garage')).toBeVisible();

        })
    })
