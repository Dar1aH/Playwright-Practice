import {test as base} from '@playwright/test'
import GaragePage from '../../pom/pages/GaragePage'

type fixturePages = {
    userGaragePage: GaragePage
}
export const test = base.extend<fixturePages>({
    userGaragePage: async({browser}, user) => {
        const context = await browser.newContext({
            storageState: './test-data/states/registeredUserState.json'
        })
    const page = await context.newPage()
    const garagePage = new GaragePage(page)
    await garagePage.open()
    await user(garagePage)
    await context.close()
    }
})

export const expect = test.expect