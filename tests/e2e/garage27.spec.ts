import { test,expect } from "/Users/daxundaintravel/Desktop/Hillel QA Automation JS/Playwright-Practice/test-data/fixtures/pagesFixture.ts";

test.describe("Garage Page with custom fixture userGaragePage", () => {
    
    test("Add BMW X6", async ({ userGaragePage }) => {
        await userGaragePage.addCarByBrandAndModel("BMW", "X6", "500");
        await userGaragePage.verifyLastAddedCar("BMW X6");
    });

    test("Add Audi TT", async ({ userGaragePage }) => {
        await userGaragePage.addCarByBrandAndModel("Audi", "TT", "500");
        await userGaragePage.verifyLastAddedCar("Audi TT");
    });

    test("Add Ford Fiesta", async ({ userGaragePage }) => {
        await userGaragePage.addCarByBrandAndModel("Ford", "Fiesta", "500");
        await userGaragePage.verifyLastAddedCar("Ford Fiesta");
    });

    test.afterEach(async ({ userGaragePage }) => {
        await userGaragePage.removeLastAddedCar();
    });
});
