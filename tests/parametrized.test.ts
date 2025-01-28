import { test, expect } from '@playwright/test';
import { HomePage } from '../page_objects/home-page';
import testData from './parametrizedTestData.json'

/**
 * №12
 * 1. Написати параметризований тест для форми https://demoqa.com/automation-practice-form
 * 2. Дата провайдер повинен мати мінімум 5 разних наборів данних.
 * 3. Напишіть функцію конструктор яка буде повертати обʼєкт який містить властивості і методи необхідні для роботи
 * зі сторінкою.
 * (приклад дивіться на відео https://t.me/c/2456196894/83/749)
 */

for (let inputData of testData) {
  test(`${inputData.inputs.lastName}: submit registration form`, async ({ page }) => {
    const homePage = new HomePage(page);
  
    const registrationData = await homePage.getTestDataAsArray(
      inputData.inputs,
      inputData.selections,
      inputData.gender,
      inputData.hobbies
    );
  
    await homePage.goToHomePage();
    await homePage.fillInputs(inputData.inputs);
    await homePage.genderCheck(inputData.gender);
    await homePage.fillSelections(inputData.selections);
    await homePage.hobbiesCheck(inputData.hobbies);
    await homePage.studentRegformLocators.submitBtn.click();
  
    await expect(homePage.successModal.headerMsgLocator).toContainText(
      await homePage.getModalSuccessMsg()
    );
    for (let value of registrationData) {
      await expect(homePage.successModal.content).toContainText(value);
    }
  });
  
}
