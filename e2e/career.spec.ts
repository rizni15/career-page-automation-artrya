import { test, expect } from '@playwright/test';
import { CareersPage } from '../pom/careersPage';

test.describe('Careers Page Tests', () => {
  let careersPage:CareersPage;

  test.beforeEach(async ({ page }) => {
    careersPage = new CareersPage(page)
    await page.goto('/careers');
  });
  
  test('shoulld load careers page successfully', async ({ page}) => {
    //Verify the title 
    await expect(page).toHaveTitle('Careers – Artrya');
    //Verify Company Logo
    await expect(careersPage.logo).toBeVisible()
    //Verify the header 
    await expect(careersPage.header).toBeVisible()
    //Verify the URL
    await expect(page).toHaveURL('/careers/')
  });

  test(' join us button is navgating to contact page', async ({ page }) => { 
    await careersPage.clickJoinUsButton()
    await expect(page).toHaveURL('/contact-us/')
    await expect(page).toHaveTitle('Contact Us – Artrya');
  });
  
  test('careers page shows empty state when no jobs are available', async ({  }) => { 
    await expect(careersPage.emptyMessage).toBeVisible();
  });

  test.skip('verify job listings when available', async () => {
    // future test when data exists
  })

  test('should display correct recruiter email', async ({  }) => { 
   await expect(careersPage.emailAdress).toHaveText("recruit@artrya.com")
  });

  test('contact us today button navigation', async ({ page }) => { 
    await careersPage.clickContactUsTodayButton()
    await expect(page).toHaveURL('/contact-us/')
    await expect(page).toHaveTitle('Contact Us – Artrya');
  });

  test('should successfully sign up to newsletter with valid data', async ({  }) => { 
    await careersPage.enterFirstName('Rizni')
    await careersPage.enterLastName('Rizvi')
    await careersPage.enterEmail('rizni@lk.com')
    await careersPage.clickSubmit()
    await expect(careersPage.succesFullMessage).toHaveText('Thanks for signing up to our newsletter.')
  });

  test('validates required first name field', async ({  }) => { 
    await careersPage.enterLastName('Rizvi')
    await careersPage.enterEmail('rizni@lk.com')
    await careersPage.clickSubmit()
    await expect(careersPage.requiredFieldErrorMessage).toHaveText('Please complete this required field.')
  });

  test('validates required last name field', async ({  }) => { 
    await careersPage.enterFirstName('Rizni')
    await careersPage.enterEmail('rizni@lk.com')
    await careersPage.clickSubmit()
    await expect(careersPage.requiredFieldErrorMessage).toHaveText('Please complete this required field.')
  });

  test('validates required email field', async ({  }) => { 
    await careersPage.enterFirstName('Rizni')
    await careersPage.enterLastName('Rizvi')
    await careersPage.clickSubmit()
    await expect(careersPage.requiredFieldErrorMessage).toHaveText('Please complete this required field.')
  });

  test('should show error for invalid email format ', async ({  }) => { 
    await careersPage.enterEmail('rizni')
    await expect(careersPage.requiredFieldErrorMessage).toHaveText('Email must be formatted correctly.')
  });

  test('validates all required fields', async ({  }) => { 
    await careersPage.clickSubmit()
    await expect(careersPage.allFeildsRequiredErrorMessage).toHaveText('Please complete all required fields.')
  });

  test('company address is accurate', async ({ }) => { 
   await expect(careersPage.addressContainer.filter({hasText:"1257 Hay Street, West Perth, 6005"})).toBeVisible()
  });

})
