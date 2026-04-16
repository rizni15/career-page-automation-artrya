import { test, expect } from "../base.ts";
import TestData from "../data/testData.json";

test.describe("Careers Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/careers");
  });

  test("should load careers page successfully", async ({
    page,
    careersPage,
  }) => {
    //Verify the title
    await expect(page).toHaveTitle("Careers – Artrya");
    //Verify Company Logo
    await expect(careersPage.logo).toBeVisible();
    //Verify the header
    await expect(careersPage.header).toBeVisible();
    //Verify the URL
    await expect(page).toHaveURL("/careers/");
  });

  test("header dropdowns and navigations are functional", async ({
    page,
    careersPage,
  }) => {
    // verify our solutions dropdwon
    const ourSolutionDropDownValues = ["Physicians", "Patients"];
    await careersPage.openDropdown(careersPage.ourSolutionsDropdown);
    await careersPage.verifyLinks(ourSolutionDropDownValues);

    //verify about us dropdown
    const aboutUsDropDrownValues = [
      "Who We Are",
      "Board of Directors",
      "Careers",
    ];
    await careersPage.openDropdown(careersPage.aboutUsdropdown);
    await careersPage.verifyLinks(aboutUsDropDrownValues);

    //verify investor relations dropdown
    const investorRelations = [
      "Overview",
      "ASX Announcements",
      "Corporate Governance",
      "Company Research",
      "Investor Presentations",
      "Investor Calls / Webcasts",
    ];
    await careersPage.openDropdown(careersPage.investorRelationsDropdown);
    await careersPage.verifyLinks(investorRelations);

    // verify contact us button in header
    await careersPage.openDropdown(careersPage.contactUs);
    await expect(page).toHaveURL("/contact-us/");
    await expect(page).toHaveTitle("Contact Us – Artrya");

    //verify request a demo button
    await careersPage.openDropdown(careersPage.requestDemoButton);
    await expect(page).toHaveURL("/salix-demo/");
    await expect(page).toHaveTitle("Request a Demonstration – Artrya");
  });

  test("join us button is navgating to contact us page", async ({
    page,
    careersPage,
  }) => {
    await careersPage.clickJoinUsButton();
    await expect(page).toHaveURL("/contact-us/");
    await expect(page).toHaveTitle("Contact Us – Artrya");
  });

  test("atryan value & culture sections displays correct heading and description ", async ({
    careersPage
  }) => {
    //values
    await expect(careersPage.valuesHeading).toBeVisible();
    await expect(
      careersPage.verifyValuesAndCultureDescription(TestData.valuesDescription),
    ).toBeVisible();
    //cultures
    await expect(careersPage.cultureHeading).toBeVisible();
    await expect(
      careersPage.verifyValuesAndCultureDescription(
        TestData.culturesDescription,
      ),
    ).toBeVisible();
  });

  test("staff image is loading and visible", async ({ careersPage }) => {
    await expect(careersPage.staffImage).toBeVisible();
    await expect(careersPage.staffImage).toHaveAttribute(
      "src",
      /.*careers-collage.webp/,
    );
  });

  test("employee testomonials are loading", async ({ careersPage, page }) => {
    const employees = [
      {
        title: "Research & Development Lead",
        img: "carrers-research-develop",
        text: TestData.rndLeadTestimonial,
      },
      {
        title: "Medical Imaging Research Assistant",
        img: "carrers-medical-imaging",
        text: TestData.medicalImageAssitantTestimonial,
      },
      {
        title: "Senior Data Scientist – Cardiovascular",
        img: "carrers-senior-data-scientist",
        text: TestData.dataScientistDescription,
      },
    ];

    for (const person of employees) {
      await careersPage.verifyEmployeeSection(
        person.title,
        person.img,
        person.text,
      );
    }
  });

  test("atrya values contents", async ({ careersPage }) => {
    /**
     * SUMMARY:
     * This test validates the "Company Values" section of the Careers page.
     * It ensures that each Value Section contains:
     * 1. A visible Icon (SVG).
     * 2. The correct Title text.
     * 3. The expected list of Bullet Points (Value Statements) defined in our TestData.
     */
    const companyValues = [
      {
        title: "Innovation",
        expectedBullets: TestData.innovationPoints,
      },
      {
        title: "Move patients to low-cost care settings",
        expectedBullets: TestData.movePatientstoLowCostPoints,
      },
      {
        title: "Minimize the ER carousel of patient readmissions",
        expectedBullets: TestData.minimizetERPatientRreadmissionsPoints,
      },
      {
        title: "Integrity",
        expectedBullets: TestData.integrityPoints,
      },
      {
        title: "Delivery",
        expectedBullets: TestData.DeliveryPoints,
      },
    ];

    for (const value of companyValues) {
      // Find the specific container for this value to scope our checks
      const valueBox = careersPage.getValuesContainer(value.title);

      // 1. Verify the visual icon is present inside the box
      // We target the SVG specifically to avoid strict-mode conflicts with the wrapper div
      await expect(
        careersPage.getValuesIcon(value.title),
        `Icon for "${value.title}" should be visible`,
      ).toBeVisible();

      // 2. Verify the heading title text matches exactly
      await expect(
        careersPage.getValuesTitle(value.title),
        `Title "${value.title}" should be visible`,
      ).toBeVisible();

      // 3. Verify the descriptive bullet points match our source data
      // .toHaveText() validates the array of <li> elements against the TestData array
      await expect(
        careersPage.getValuesBulletPoints(value.title),
        `Bullet points for "${value.title}" do not match expected data`,
      ).toHaveText(value.expectedBullets);
    }
  });

  test("comapany group picture is loading", async ({ careersPage }) => {
    await expect(careersPage.groupPhoto).toBeVisible(); 
  });

  test("careers page shows empty state when no jobs are available", async ({
    careersPage,
  }) => {
    await expect(careersPage.emptyMessage).toBeVisible();
  });

  test.skip("verify job listings when available", async () => {
    // future test when data exists
  });

  test("should display correct recruiter email", async ({ careersPage }) => {
    await expect(careersPage.emailAdress).toHaveText("recruit@artrya.com");
  });

  test("contact us today button navigation", async ({ page, careersPage }) => {
    await careersPage.clickContactUsTodayButton();
    await expect(page).toHaveURL("/contact-us/");
    await expect(page).toHaveTitle("Contact Us – Artrya");
  });

  test("should successfully sign up to newsletter with valid data", async ({
    careersPage,
  }) => {
    await careersPage.enterFirstName(TestData.firstName);
    await careersPage.enterLastName(TestData.lastName);
    await careersPage.enterEmail(TestData.email);
    await careersPage.clickSubmit();
    await expect(careersPage.succesFullMessage).toHaveText(
      "Thanks for signing up to our newsletter.",
    );
  });

  test("validates required first name field", async ({ careersPage }) => {
    await careersPage.enterLastName(TestData.lastName);
    await careersPage.enterEmail(TestData.email);
    await careersPage.clickSubmit();
    await expect(careersPage.requiredFieldErrorMessage).toHaveText(
      "Please complete this required field.",
    );
  });

  test("validates required last name field", async ({ careersPage }) => {
    await careersPage.enterFirstName(TestData.firstName);
    await careersPage.enterEmail(TestData.email);
    await careersPage.clickSubmit();
    await expect(careersPage.requiredFieldErrorMessage).toHaveText(
      "Please complete this required field.",
    );
  });

  test("validates required email field", async ({ careersPage }) => {
    await careersPage.enterFirstName(TestData.firstName);
    await careersPage.enterLastName(TestData.lastName);
    await careersPage.clickSubmit();
    await expect(careersPage.requiredFieldErrorMessage).toHaveText(
      "Please complete this required field.",
    );
  });

  test("should show error for invalid email format ", async ({
    careersPage,
  }) => {
    await careersPage.enterEmail(TestData.firstName);
    await expect(careersPage.requiredFieldErrorMessage).toHaveText(
      "Email must be formatted correctly.",
    );
  });

  test("validates all required fields", async ({ careersPage }) => {
    await careersPage.clickSubmit();
    await expect(careersPage.allFeildsRequiredErrorMessage).toHaveText(
      "Please complete all required fields.",
    );
  });

  test("company address is accurate", async ({ careersPage }) => {
    await expect(
      careersPage.addressContainer.filter({ hasText: TestData.address }),
    ).toBeVisible();
  });

  test("footer navigations are functional", async ({ careersPage, page }) => {
    //verify request a deamo link
    await careersPage.clickRequestDemoLink();
    await expect(page).toHaveURL("/salix-demo/");
    await expect(page).toHaveTitle("Request a Demonstration – Artrya");

    // verify contact us link
    await careersPage.clickContactusLink();
    await expect(page).toHaveURL("/contact-us/");
    await expect(page).toHaveTitle("Contact Us – Artrya");

    // verify about us link
    await careersPage.clickAboutUsLink();
    await expect(page).toHaveURL("who-we-are/");
    await expect(page).toHaveTitle("Who we are – Artrya");

    // verify investor relations link
    await careersPage.clickInvestorRelations();
    await expect(page).toHaveURL("investor-relations/");
    await expect(page).toHaveTitle("Investor Relations – Artrya");
  });

  test("social media link navigations", async ({ careersPage, page }) => {
    // verify x (twitter) link
    await careersPage.clickXlinkIcon();
    await expect(page).toHaveURL("https://x.com/Artrya1");
    await expect(page).toHaveTitle("Artrya (@Artrya1) / X");

    await careersPage.goBack();

    // verify linkedIn link
    await careersPage.clickLinkedInIcon();
    await expect(page).toHaveURL("https://www.linkedin.com/company/artrya/");
    await expect(page).toHaveTitle("Artrya Ltd | LinkedIn");
  });

  test("regulatory disclaimer content is accurate", async ({
    careersPage,
  }) => {
    const disclaimer = careersPage.getRegulatoryDisclaimer(
      TestData.regulatoryDisclaimer,
    );
    await expect(disclaimer).toBeVisible();
    //Verify the full content matches data
    await expect(disclaimer).toContainText(TestData.regulatoryDisclaimer);
  });

  test("contact us link regulatory disclaimer", async ({
    careersPage,
    page,
  }) => {
    await careersPage.clickcontactUsLinkInDisclaimer();
    await expect(page).toHaveURL("/contact-us/");
    await expect(page).toHaveTitle("Contact Us – Artrya");
  });

  test("copyright notice and legal footer links", async ({
    careersPage,
    page,
  }) => {
    await expect(
      careersPage.getCopyrightContainer("2025, Artrya. All rights reserved"),
    ).toBeVisible();
    // verify privacy policy link
    await careersPage.getCopyrightLink("Privacy Policy").click();
    await expect(page).toHaveURL("/privacy-policy/");
    await expect(page).toHaveTitle("Privacy Policy – Artrya");

    await careersPage.goBack();
    // verify terms & condiotions link
    await careersPage.getCopyrightLink("Terms and Conditions").click();
    await expect(page).toHaveURL("/terms-and-conditions/");
    await expect(page).toHaveTitle("Terms & Conditions – Artrya");

    await careersPage.goBack();

    //verify Indications for Use link
    await careersPage.getCopyrightLink("Indications for Use").click();
    await expect(page).toHaveURL("/indications-for-use/");
    await expect(page).toHaveTitle("Indications for Use – Artrya");
  });
});
