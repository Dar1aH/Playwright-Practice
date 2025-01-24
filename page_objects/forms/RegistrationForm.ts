import { expect } from '@playwright/test';

class RegistrationForm {
    elements = {
        nameInputField: (page: any) => page.locator('//input[@id="signupName"]'),
        lastNameInputField: (page: any) => page.locator('//input[@id="signupLastName"]'),
        emailInputField: (page: any) => page.locator('//input[@id="signupEmail"]'),
        passwordInputField: (page: any) => page.locator('//input[@id="signupPassword"]'),
        reEnterPasswordField: (page: any) => page.locator('//input[@id="signupRepeatPassword"]'),
        registerBtn: (page: any) => page.getByText('Register'),
        headerGarage: (page: any) => page.getByRole('heading', { name: 'Garage' }),
        errorMessage: (page: any, fieldId: string) =>
            page.locator(`//input[@id="${fieldId}"]/following-sibling::div[@class="invalid-feedback"]//p`)        

    }

    async verifyEmptyFieldErrorByText(
        page: any,
        inputField: (page: any) => any,
        fieldId: string,
        expectedErrorText: string
    ): Promise<void> {
        const field = await inputField(page)
        const errorMessage = this.elements.errorMessage(page, fieldId)
        await field.focus()
        await field.blur()
        await expect(errorMessage).toBeVisible()
        await expect(errorMessage).toHaveText(expectedErrorText)
    }

    async verifyEmptyNameErrorByText(page: any, expectedErrorText: string): Promise<void> {
        await this.verifyEmptyFieldErrorByText(page, this.elements.nameInputField,'signupName', expectedErrorText)
    }

    async verifyEmptyLastNameErrorByText(page: any, expectedErrorText: string): Promise<void> {
        await this.verifyEmptyFieldErrorByText(page, this.elements.lastNameInputField, 'signupLastName', expectedErrorText)
    }

    async verifyEmptyEmailErrorByText(page: any, expectedErrorText: string): Promise<void> {
        await this.verifyEmptyFieldErrorByText(page, this.elements.emailInputField, 'signupEmail', expectedErrorText)
    }

    async verifyEmptyPasswordErrorByText(page: any, expectedErrorText: string): Promise<void> {
        await this.verifyEmptyFieldErrorByText(page, this.elements.passwordInputField, 'signupPassword', expectedErrorText)
    }

    async verifyEmptyReEnterPasswordErrorByText(page: any, expectedErrorText: string): Promise<void> {
        await this.verifyEmptyFieldErrorByText(page, this.elements.reEnterPasswordField, 'signupRepeatPassword', expectedErrorText)
    }

    async verifyNameWrongLengthErrorByText(page: any, expectedErrorText: string): Promise<void> {
        await this.elements.nameInputField(page).fill('A')
        await this.verifyEmptyFieldErrorByText(page, this.elements.nameInputField,'signupName', expectedErrorText)
    }

    async verifyNameWrongDataErrorByText(page: any, expectedErrorText: string): Promise<void> {
        await this.elements.nameInputField(page).fill('一只猫')
        await this.verifyEmptyFieldErrorByText(page, this.elements.nameInputField,'signupName', expectedErrorText)
    }

    async verifyLastNameWrongLengthErrorByText(page:any, expectedErrorText: string): Promise<void> {
        await this.elements.lastNameInputField(page).fill('A')
        await this.verifyEmptyFieldErrorByText(page, this.elements.lastNameInputField, 'signupLastName', expectedErrorText)
    }

    async verifyLastNameWrongDataErrorByText(page:any, expectedErrorText: string): Promise<void> {
        await this.elements.lastNameInputField(page).fill('一只猫')
        await this.verifyEmptyFieldErrorByText(page, this.elements.lastNameInputField, 'signupLastName', expectedErrorText)
    }

    async verifyInvalidEmailByText(page:any, expectedErrorText: string): Promise<void> {
        await this.elements.emailInputField(page).fill('abcds')
        await this.verifyEmptyFieldErrorByText(page, this.elements.emailInputField,'signupEmail', expectedErrorText)
    }

    async verifyWrongDataPasswordByText(page:any, expectedErrorText: string): Promise<void> {
        await this.elements.passwordInputField(page).fill('abc')
        await this.verifyEmptyFieldErrorByText(page, this.elements.passwordInputField, 'signupPassword', expectedErrorText)

    }

    async verifyPasswordMismatchByText(page:any, expectedErrorText: string): Promise<void> {
        await this.elements.passwordInputField(page).fill('9Fasdfggg')
        await this.elements.reEnterPasswordField(page).fill('8Fasdfggg')
        await this.verifyEmptyFieldErrorByText(page, this.elements.reEnterPasswordField, 'signupRepeatPassword', expectedErrorText)
    }
    
    async enterName(page:any): Promise<void> {
        await this.elements.nameInputField(page).fill('Daria')
    }

    async enterLastName(page:any): Promise<void> {
        await this.elements.lastNameInputField(page).fill('Herasymenko')
    }

    async enterEmail(page: any): Promise<void> {
        const uniqueEmail = `testuser+${Date.now()}@example.com`;
        await this.elements.emailInputField(page).fill(uniqueEmail);
    }
    

    async enterPassword(page:any): Promise<void> {
        await this.elements.passwordInputField(page).fill('9Fasdfggg')
    }

    async reEnterPassword(page:any):Promise<void> {
        await this.elements.reEnterPasswordField(page).fill('9Fasdfggg')
    }

    async verifyRegisterBtnDisabled(page:any):Promise<void> {
        const registerBtn = await this.elements.registerBtn(page)
        await expect(registerBtn).toBeDisabled()
    }

    async clickRegisterBtn(page:any):Promise<void> {
        const registerBtn = await this.elements.registerBtn(page)
        await registerBtn.click()
    }

    async verifySuccessfulRegistration(page:any):Promise<void> {
        const headerGarage = await this.elements.headerGarage(page)
        await expect(headerGarage).toHaveText('Garage')
    }

}
export default RegistrationForm