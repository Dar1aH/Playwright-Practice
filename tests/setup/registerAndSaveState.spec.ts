import { test as setup } from '@playwright/test';
import HomeSection from '../../page_objects/sections/HomeSection.ts';
import RegistrationForm from '../../page_objects/forms/RegistrationForm.ts';
import { credentials } from '../../test-data/usersData.ts';

setup.describe('Register user - get states', () => {
    let homeSection: HomeSection;
    let registrationForm: RegistrationForm;


    setup.beforeEach(async ({ page }) => {
        homeSection = new HomeSection(page)
        registrationForm = new RegistrationForm(page)
        await homeSection.open();
        await homeSection.clickSignUpBtn()
    });

    setup('Register and save state for user', async ({page}) => {
        await registrationForm.enterName(credentials.userOne.name)
        await registrationForm.enterLastName(credentials.userOne.surname)
        await registrationForm.enterEmail(credentials.randomUser.email)
        await registrationForm.enterPassword(credentials.userOne.password)
        await registrationForm.reEnterPassword(credentials.userOne.password)
        await registrationForm.verifyRegisterBtnDisabled(false)
        await registrationForm.clickRegisterBtn()
        await registrationForm.verifySuccessfulRegistration('Garage')
        await page.context().storageState({path: './test-data/states/registeredUserState.json'})

    })

})
