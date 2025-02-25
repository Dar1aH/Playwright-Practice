import { test, expect } from '@playwright/test';
import HomeSection from '../page_objects/sections/HomeSection';
import RegistrationForm from '../page_objects/forms/RegistrationForm';
import { credentials } from '../test-data/usersData.ts';

test.describe('Registration form test', () => {
    let homeSection: HomeSection;
    let registrationForm: RegistrationForm;
    const uniqueEmail = `testuser+${Date.now()}@example.com`;


    test.beforeEach(async ({ page }) => {
        homeSection = new HomeSection(page)
        registrationForm = new RegistrationForm(page)
        await homeSection.open();
        await homeSection.clickSignUpBtn()
    });

    test('Verify validation errors for empty fields', async () => {
        await registrationForm.verifyEmptyNameErrorByText('Name required')
        await registrationForm.verifyEmptyLastNameErrorByText('Last name required')
        await registrationForm.verifyEmptyEmailErrorByText('Email required')
        await registrationForm.verifyEmptyPasswordErrorByText('Password required')
        await registrationForm.verifyEmptyReEnterPasswordErrorByText('Re-enter password required')

    })

    test('Verify validation errors for invalid name,last name, email, password and password mismatch ', async () => {
        await registrationForm.verifyNameWrongLengthErrorByText('Name has to be from 2 to 20 characters long')
        await registrationForm.verifyNameWrongDataErrorByText('Name is invalid')
        await registrationForm.verifyLastNameWrongLengthErrorByText('Last name has to be from 2 to 20 characters long')
        await registrationForm.verifyLastNameWrongDataErrorByText('Last name is invalid')
        await registrationForm.verifyInvalidEmailByText('Email is incorrect')
        await registrationForm.verifyWrongDataPasswordByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await registrationForm.verifyPasswordMismatchByText('Passwords do not match')

    })

    test('Verify the Register button is disabled without name', async () => {
        await registrationForm.enterLastName(credentials.userOne.surname)
        await registrationForm.enterEmail(uniqueEmail)
        await registrationForm.enterPassword(credentials.userOne.password)
        await registrationForm.reEnterPassword(credentials.userOne.password)
        await registrationForm.verifyRegisterBtnDisabled(true)

    })

    test('Verify the Register button is disabled without last name', async () => {
        await registrationForm.enterName(credentials.userOne.name)
        await registrationForm.enterEmail(uniqueEmail)
        await registrationForm.enterPassword(credentials.userOne.password)
        await registrationForm.reEnterPassword(credentials.userOne.password)
        await registrationForm.verifyRegisterBtnDisabled(true)

    })

    test('Verify the Register button is disabled without email', async () => {
        await registrationForm.enterName(credentials.userOne.name)
        await registrationForm.enterLastName(credentials.userOne.surname)
        await registrationForm.enterPassword(credentials.userOne.password)
        await registrationForm.reEnterPassword(credentials.userOne.password)
        await registrationForm.verifyRegisterBtnDisabled(true)

    })

    test('Verify the Register button is disabled without password', async () => {
        await registrationForm.enterName(credentials.userOne.password)
        await registrationForm.enterLastName(credentials.userOne.password)
        await registrationForm.enterEmail(uniqueEmail)
        await registrationForm.reEnterPassword(credentials.userOne.password)
        await registrationForm.verifyRegisterBtnDisabled(true)

    })

    test('Verify the Register button is disabled without re-enter password', async () => {
        await registrationForm.enterName(credentials.userOne.name)
        await registrationForm.enterLastName(credentials.userOne.surname)
        await registrationForm.enterEmail(uniqueEmail)
        await registrationForm.enterPassword(credentials.userOne.password)
        await registrationForm.verifyRegisterBtnDisabled(true)

    })

    test('Verify successful registration with valid data', async () => {
        await registrationForm.enterName(credentials.userOne.name)
        await registrationForm.enterLastName(credentials.userOne.surname)
        await registrationForm.enterEmail(credentials.userOne.email)
        await registrationForm.enterPassword(credentials.userOne.password)
        await registrationForm.reEnterPassword(credentials.userOne.password)
        await registrationForm.verifyRegisterBtnDisabled(false)
        await registrationForm.clickRegisterBtn()
        await registrationForm.verifySuccessfulRegistration('Garage')

    })
})
