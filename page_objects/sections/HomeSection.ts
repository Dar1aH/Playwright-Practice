import { Locator, Page } from "@playwright/test";

export default class HomeSection {
    readonly page: Page;
    readonly signInBtn: Locator;
    readonly signUpBtn: Locator;


    constructor(page: Page) {
        this.page = page
        this.signInBtn = page.getByText('Sign In');
        this.signUpBtn = page.getByText('Sign Up');
    }

    async open() {
        await this.page.goto('/')
    }

    async clickSignInBtn(): Promise<void> {
        await this.signInBtn.click();

    }

    async clickSignUpBtn(): Promise<void> {
        await this.signUpBtn.click();

    }

}




