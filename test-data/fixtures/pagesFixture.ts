import {test as base} from '@playwright/test'
import GaragePage from '../../pom/pages/GaragePage'

type fixturePages = {
    userGaragePage: GaragePage
}
export const test = base.extend<fixturePages>({
    userGaragePage: async({browser}, use) => {
        const context = await browser.newContext({    // Creating a new Browser Context
            storageState: './test-data/states/registeredUserState.json'
        })
    const page = await context.newPage() //Creating a new page
    const garagePage = new GaragePage(page) //Instantiating the GaragePage Object
    await garagePage.open() // Navigating to the Garage Page with the user already authenticated
    await use(garagePage) // using the fixture
    await context.close() // cleaning up
    }
})

export const expect = test.expect