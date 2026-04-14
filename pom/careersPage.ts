import { expect, type Locator, type Page } from '@playwright/test';

export class CareersPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly joinUsButton: Locator;
  readonly emptyMessage: Locator;
  readonly contactUstoday: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly submit: Locator;
  readonly header: Locator;
  readonly succesFullMessage: Locator;
  readonly requiredFieldErrorMessage: Locator;
  readonly allFeildsRequiredErrorMessage: Locator;
  readonly addressContainer: Locator;
  readonly emailAdress: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: 'artrya-logo-white' });
    this.joinUsButton = page.getByRole('link', { name: 'Join Us'});
    this.emptyMessage = page.getByText('No results found.');
    this.contactUstoday = page.getByRole('link',{name: 'Contact us today'});
    this.firstName = page.getByLabel('First Name');
    this.lastName = page.getByLabel('Last Name');
    this.email = page.getByLabel('email');
    this.submit = page.getByRole('button',{name: 'Submit'});
    this.header = page.locator('#page-header');
    this. succesFullMessage= page.locator('.submitted-message');
    this.requiredFieldErrorMessage = page.locator('label.hs-error-msg');
    this.allFeildsRequiredErrorMessage = page.getByRole('list').filter({ hasText: 'Please complete all required' })
    this.addressContainer = page.locator('.w-text-h');
    this.emailAdress = page.locator('a[href^="mailto:"]');
  }

  async clickJoinUsButton(){
    await this.joinUsButton.click()
  }

  async clickContactUsTodayButton(){
    await this.contactUstoday.click()
  }

  async enterFirstName(firstName:string){
    await this.firstName.fill(firstName)
  }

  async enterLastName(lastName:string){
    await this.lastName.fill(lastName)
  }

  async enterEmail(email:string){
    await this.email.fill(email)
  }

  async clickSubmit(){
    await this.submit.click()
  }

}
