import { test, expect } from '@playwright/test';
import HomeSection from '../page_objects/sections/HomeSection';
import RegistrationForm from '../page_objects/forms/RegistrationForm';

test.describe('Registration form test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const homeSection = new HomeSection()
        await homeSection.clickSignUpBtn(page)
    });

    test('Verify validation errors for empty fields', async ({ page }) => {
        const registrationForm = new RegistrationForm()
        await registrationForm.verifyEmptyNameErrorByText(page, 'Name required')
        await registrationForm.verifyEmptyLastNameErrorByText(page, 'Last name required')
        await registrationForm.verifyEmptyEmailErrorByText(page, 'Email required')
        await registrationForm.verifyEmptyPasswordErrorByText(page, 'Password required')
        await registrationForm.verifyEmptyReEnterPasswordErrorByText(page, 'Re-enter password required')

    })

    test('Verify validation errors for invalid name,last name, email, password and password mismatch ', async ({ page }) => {
        const registrationForm = new RegistrationForm()
        await registrationForm.verifyNameWrongLengthErrorByText(page, 'Name has to be from 2 to 20 characters long')
        await registrationForm.verifyNameWrongDataErrorByText(page, 'Name is invalid')
        await registrationForm.verifyLastNameWrongLengthErrorByText(page, 'Last name has to be from 2 to 20 characters long')
        await registrationForm.verifyLastNameWrongDataErrorByText(page, 'Last name is invalid')
        await registrationForm.verifyInvalidEmailByText(page, 'Email is incorrect')
        await registrationForm.verifyWrongDataPasswordByText(page, 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await registrationForm.verifyPasswordMismatchByText(page, 'Passwords do not match')

    })

    test('Verify the Register button is disabled without name', async ({ page }) => {
        const registrationForm = new RegistrationForm()
        await registrationForm.enterLastName(page)
        await registrationForm.enterEmail(page)
        await registrationForm.enterPassword(page)
        await registrationForm.reEnterPassword(page)
        await registrationForm.verifyRegisterBtnDisabled(page)

    })

    test('Verify the Register button is disabled without last name', async ({ page }) => {
        const registrationForm = new RegistrationForm()
        await registrationForm.enterName(page)
        await registrationForm.enterEmail(page)
        await registrationForm.enterPassword(page)
        await registrationForm.reEnterPassword(page)
        await registrationForm.verifyRegisterBtnDisabled(page)

    })

    test('Verify the Register button is disabled without email', async ({ page }) => {
        const registrationForm = new RegistrationForm()
        await registrationForm.enterName(page)
        await registrationForm.enterLastName(page)
        await registrationForm.enterPassword(page)
        await registrationForm.reEnterPassword(page)
        await registrationForm.verifyRegisterBtnDisabled(page)

    })

    test('Verify the Register button is disabled without password', async ({ page }) => {
        const registrationForm = new RegistrationForm()
        await registrationForm.enterName(page)
        await registrationForm.enterLastName(page)
        await registrationForm.enterEmail(page)
        await registrationForm.reEnterPassword(page)
        await registrationForm.verifyRegisterBtnDisabled(page)

    })

    test('Verify the Register button is disabled without re-enter password', async ({ page }) => {
        const registrationForm = new RegistrationForm()
        await registrationForm.enterName(page)
        await registrationForm.enterLastName(page)
        await registrationForm.enterEmail(page)
        await registrationForm.enterPassword(page)
        await registrationForm.verifyRegisterBtnDisabled(page)

    })

    test('Verify successful registration with valid data', async ({ page }) => {
        const registrationForm = new RegistrationForm()
        await registrationForm.enterName(page)
        await registrationForm.enterLastName(page)
        await registrationForm.enterEmail(page)
        await registrationForm.enterPassword(page)
        await registrationForm.reEnterPassword(page)
        await registrationForm.clickRegisterBtn(page)
        await registrationForm.verifySuccessfulRegistration(page)

    })
})
