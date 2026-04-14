import { test, expect } from '../base.ts';
import  TestData from '../data/testData.json';

test.describe('Careers Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/careers');
  });
  
  test('shoulld load careers page successfully', async ({ page, careersPage}) => {
    //Verify the title 
    await expect(page).toHaveTitle('Careers – Artrya');
    //Verify Company Logo
    await expect(careersPage.logo).toBeVisible()
    //Verify the header 
    await expect(careersPage.header).toBeVisible()
    //Verify the URL
    await expect(page).toHaveURL('/careers/')
  });

  test(' join us button is navgating to contact page', async ({ page , careersPage}) => { 
    await careersPage.clickJoinUsButton()
    await expect(page).toHaveURL('/contact-us/')
    await expect(page).toHaveTitle('Contact Us – Artrya');
  });
  
  test('careers page shows empty state when no jobs are available', async ({ careersPage }) => { 
    await expect(careersPage.emptyMessage).toBeVisible();
  });

  test.skip('verify job listings when available', async () => {
    // future test when data exists
  })

  test('should display correct recruiter email', async ({ careersPage }) => { 
   await expect(careersPage.emailAdress).toHaveText("recruit@artrya.com")
  });

  test('contact us today button navigation', async ({ page,careersPage }) => { 
    await careersPage.clickContactUsTodayButton()
    await expect(page).toHaveURL('/contact-us/')
    await expect(page).toHaveTitle('Contact Us – Artrya');
  });

  test('should successfully sign up to newsletter with valid data', async ({ careersPage }) => { 
    await careersPage.enterFirstName(TestData.firstName)
    await careersPage.enterLastName(TestData.lastName)
    await careersPage.enterEmail(TestData.email)
    await careersPage.clickSubmit()
    await expect(careersPage.succesFullMessage).toHaveText('Thanks for signing up to our newsletter.')
  });

  test('validates required first name field', async ({  careersPage}) => { 
    await careersPage.enterLastName(TestData.lastName)
    await careersPage.enterEmail(TestData.email)
    await careersPage.clickSubmit()
    await expect(careersPage.requiredFieldErrorMessage).toHaveText('Please complete this required field.')
  });

  test('validates required last name field', async ({ careersPage }) => { 
    await careersPage.enterFirstName(TestData.firstName)
    await careersPage.enterEmail(TestData.email)
    await careersPage.clickSubmit()
    await expect(careersPage.requiredFieldErrorMessage).toHaveText('Please complete this required field.')
  });

  test('validates required email field', async ({ careersPage  }) => { 
    await careersPage.enterFirstName(TestData.firstName)
    await careersPage.enterLastName(TestData.lastName)
    await careersPage.clickSubmit()
    await expect(careersPage.requiredFieldErrorMessage).toHaveText('Please complete this required field.')
  });

  test('should show error for invalid email format ', async ({ careersPage }) => { 
    await careersPage.enterEmail(TestData.firstName)
    await expect(careersPage.requiredFieldErrorMessage).toHaveText('Email must be formatted correctly.')
  });

  test('validates all required fields', async ({ careersPage }) => { 
    await careersPage.clickSubmit()
    await expect(careersPage.allFeildsRequiredErrorMessage).toHaveText('Please complete all required fields.')
  });

  test('company address is accurate', async ({ careersPage }) => { 
   await expect(careersPage.addressContainer.filter({hasText:TestData.address})).toBeVisible()
  });

})
