class HomeSection {
    elements = {
        signInBtn: (page:any) => page.getByText('Sign In'),
        signUpBtn: (page:any) => page.getByText('Sign Up'),
    }

    async clickSignInBtn(page:any): Promise<void> {
        const signInBtn = await this.elements.signInBtn(page)
        await signInBtn.click()

    }

    async clickSignUpBtn(page:any): Promise<void> {
        const signUpBtn = await this.elements.signUpBtn(page)
        await signUpBtn.click()

    }

}

export default HomeSection