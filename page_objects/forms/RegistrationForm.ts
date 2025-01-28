import { expect, Locator, Page } from "@playwright/test";

export default class RegistrationForm {
    readonly page: Page;
    readonly nameInputField: Locator;
    readonly lastNameInputField: Locator;
    readonly emailInputField: Locator;
    readonly passwordInputField: Locator;
    readonly reEnterPasswordField: Locator;
    readonly registerBtn: Locator;
    readonly headerGarage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInputField = page.locator('//input[@id="signupName"]');
        this.lastNameInputField = page.locator('//input[@id="signupLastName"]');
        this.emailInputField = page.locator('//input[@id="signupEmail"]');
        this.passwordInputField = page.locator('//input[@id="signupPassword"]');
        this.reEnterPasswordField = page.locator('//input[@id="signupRepeatPassword"]');
        this.registerBtn = page.getByText('Register');
        this.headerGarage = page.getByRole('heading', { name: 'Garage' });
    }

    async getErrorMessage(fieldId: string): Promise<Locator> {
        return this.page.locator(
            `//input[@id="${fieldId}"]/following-sibling::div[@class="invalid-feedback"]//p`
        )
    }

    async verifyFieldError(
        inputField: Locator,
        fieldId: string,
        expectedErrorText: string
    ): Promise<void> {
        const errorMessage = await this.getErrorMessage(fieldId);
        await inputField.focus();
        await inputField.blur();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(expectedErrorText);
    }

    async verifyEmptyFieldError(inputField: Locator, fieldId: string, expectedErrorText: string): Promise<void> {
        await this.verifyFieldError(inputField, fieldId, expectedErrorText);
    }

    async verifyEmptyNameErrorByText(expectedErrorText: string): Promise<void> {
        await this.verifyEmptyFieldError(this.nameInputField, 'signupName', expectedErrorText)
    }

    async verifyEmptyLastNameErrorByText(expectedErrorText: string): Promise<void> {
        await this.verifyEmptyFieldError(this.lastNameInputField, 'signupLastName', expectedErrorText)
    }

    async verifyEmptyEmailErrorByText(expectedErrorText: string): Promise<void> {
        await this.verifyFieldError(this.emailInputField, 'signupEmail', expectedErrorText)
    }

    async verifyEmptyPasswordErrorByText(expectedErrorText: string): Promise<void> {
        await this.verifyFieldError(this.passwordInputField, 'signupPassword', expectedErrorText)
    }

    async verifyEmptyReEnterPasswordErrorByText(expectedErrorText: string): Promise<void> {
        await this.verifyFieldError(this.reEnterPasswordField, 'signupRepeatPassword', expectedErrorText)
    }

    async verifyNameWrongLengthErrorByText(expectedErrorText: string): Promise<void> {
        await this.nameInputField.fill('A')
        await this.verifyEmptyFieldError(this.nameInputField, 'signupName', expectedErrorText)
    }

    async verifyNameWrongDataErrorByText(expectedErrorText: string): Promise<void> {
        await this.nameInputField.fill('一只猫')
        await this.verifyEmptyFieldError(this.nameInputField, 'signupName', expectedErrorText)
    }

    async verifyLastNameWrongLengthErrorByText(expectedErrorText: string): Promise<void> {
        await this.lastNameInputField.fill('A')
        await this.verifyEmptyFieldError(this.lastNameInputField, 'signupLastName', expectedErrorText)
    }

    async verifyLastNameWrongDataErrorByText(expectedErrorText: string): Promise<void> {
        await this.lastNameInputField.fill('一只猫')
        await this.verifyEmptyFieldError(this.lastNameInputField, 'signupLastName', expectedErrorText)
    }

    async verifyInvalidEmailByText(expectedErrorText: string): Promise<void> {
        await this.emailInputField.fill('abcds')
        await this.verifyEmptyFieldError(this.emailInputField, 'signupEmail', expectedErrorText)
    }

    async verifyWrongDataPasswordByText(expectedErrorText: string): Promise<void> {
        await this.passwordInputField.fill('abc')
        await this.verifyEmptyFieldError(this.passwordInputField, 'signupPassword', expectedErrorText)

    }

    async verifyPasswordMismatchByText(expectedErrorText: string): Promise<void> {
        await this.passwordInputField.fill('9Fasdfggg')
        await this.reEnterPasswordField.fill('8Fasdfggg')
        await this.verifyEmptyFieldError(this.reEnterPasswordField, 'signupRepeatPassword', expectedErrorText)
    }

    async enterName(name: string): Promise<void> {
        await this.nameInputField.fill(name)
    }

    async enterLastName(lastname: string): Promise<void> {
        await this.lastNameInputField.fill(lastname)
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInputField.fill(email);
    }


    async enterPassword(password: string): Promise<void> {
        await this.passwordInputField.fill(password)
    }

    async reEnterPassword(password: string): Promise<void> {
        await this.reEnterPasswordField.fill(password)
    }

    async verifyRegisterBtnDisabled(isDisabled: boolean): Promise<void> {
        if (isDisabled) {
            await expect(this.registerBtn).toBeDisabled()
        } else {
            await expect(this.registerBtn).toBeEnabled()
        }
    }


    async clickRegisterBtn(): Promise<void> {
        await this.registerBtn.click()
    }

    async verifySuccessfulRegistration(text: string): Promise<void> {
        await expect(this.headerGarage).toHaveText(text);
    }

}

