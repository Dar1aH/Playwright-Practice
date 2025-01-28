import { Locator, Page } from "playwright";

export class HomePage {
  page: Page;
  homePageLink: string;
  studentRegformLocators: {
    inputs: {
      firstName: Locator;
      lastName: Locator;
      emailField: Locator;
      phoneField: Locator;
      addressInputArea: Locator;
    };
    selections: {
      birthDateField: Locator;
      subjectField: Locator;
      stateDropdown: Locator;
      cityDropdown: Locator;
    };
    genderChecks: Locator;
    hobbiesCheckboxes: Locator;
    submitBtn: Locator;
  };
  successModal: {
    successMsg: string;
    headerMsgLocator: Locator;
    content: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.homePageLink = "https://demoqa.com/automation-practice-form";
    this.studentRegformLocators = {
      inputs: {
        firstName: page.locator("#firstName"),
        lastName: page.locator("#lastName"),
        emailField: page.locator("#userEmail"),
        phoneField: page.locator("#userNumber"),
        addressInputArea: page.locator("#currentAddress"),
      },
      selections: {
        birthDateField: page.locator("#dateOfBirthInput"),
        subjectField: page.locator('[id="subjectsInput"]'),
        stateDropdown: page.locator("#react-select-3-input"),
        cityDropdown: page.locator("#react-select-4-input"),
      },
      genderChecks: page.locator(".custom-control.custom-radio"),
      hobbiesCheckboxes: page.locator("#hobbiesWrapper .custom-control"),
      submitBtn: page.locator("#submit"),
    };
    this.successModal = {
      successMsg: "Thanks for submitting the form",
      headerMsgLocator: page.locator("#example-modal-sizes-title-lg"),
      content: page.locator(".modal-body"),
    };
  }

  async goToHomePage() {
    await this.page.goto(this.homePageLink);
  }

  async fillInputs(objData: {}) {
    const regData: string[] = Object.values(objData);
    const locators = Object.values(this.studentRegformLocators.inputs);

    for (let i = 0; i < regData.length; i++) {
      await locators[i].fill(regData[i]);
    }
  }

  async fillSelections(objData: {}) {
    const regData: string[] = Object.values(objData);
    const locators = Object.values(this.studentRegformLocators.selections);

    for (let i = 0; i < regData.length; i++) {
 
        await locators[i].waitFor({ state: "visible" });
        await locators[i].focus();
        await locators[i].fill(regData[i]);
        await locators[i].press('Enter');
    }
}
  

  async pressEnterKeyboard() {
    await this.page.keyboard.press("Enter");
  }
  async genderCheck(genderOption: string) {
    await this.studentRegformLocators.genderChecks
      .getByText(`${genderOption}`, { exact: true })
      .check();
  }
  async hobbiesCheck(hobbies: string[]) {
    for (let value of hobbies) {
      await this.studentRegformLocators.hobbiesCheckboxes
        .getByText(value)
        .check();
    }
  }

  async getModalSuccessMsg() {
    return this.successModal.successMsg;
  }

  async getTestDataAsArray(
    objInputs: {},
    objSelections: {},
    gender: string,
    hobbies: string[]
  ) {
    const result = [gender];
    const inputsArr: string[] = Object.values(objInputs);
    const selectionArr: string[] = Object.values(objSelections);
    result.push(...inputsArr);
    result.push(...selectionArr);
    result.push(...hobbies);
    return result;
  }
}
