import { expect, type Locator, type Page } from "@playwright/test";

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
  readonly ourSolutionsDropdown: Locator;
  readonly aboutUsdropdown: Locator;
  readonly investorRelationsDropdown: Locator;
  readonly contactUs: Locator;
  readonly requestDemoButton: Locator;
  readonly valuesHeading: Locator;
  readonly cultureHeading: Locator;
  readonly staffImage: Locator;
  readonly dataScientistDescription: Locator;
  readonly groupPhoto: Locator;
  readonly requestDemoLinkFooter: Locator;
  readonly contactUsLinkFooter: Locator;
  readonly aboutUsLinkFooter: Locator;
  readonly investorRelationsLinkFooter: Locator;
  readonly xLink: Locator;
  readonly linkedIn: Locator;
  readonly contactUsLinkInDisclaimer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole("link", { name: "artrya-logo-white" });
    this.joinUsButton = page.getByRole("link", { name: "Join Us" });
    this.emptyMessage = page.getByText("No results found.");
    this.contactUstoday = page.getByRole("link", { name: "Contact us today" });
    this.firstName = page.getByLabel("First Name");
    this.lastName = page.getByLabel("Last Name");
    this.email = page.getByLabel("email");
    this.submit = page.getByRole("button", { name: "Submit" });
    this.header = page.locator("#page-header");
    this.succesFullMessage = page.locator(".submitted-message");
    this.requiredFieldErrorMessage = page.locator("label.hs-error-msg");
    this.allFeildsRequiredErrorMessage = page
      .getByRole("list")
      .filter({ hasText: "Please complete all required" });
    this.addressContainer = page.locator(".w-text-h");
    this.emailAdress = page.locator('a[href^="mailto:"]');
    this.ourSolutionsDropdown = page.getByRole("link", {
      name: "Our Solution ",
    });
    this.aboutUsdropdown = page.getByRole("link", { name: "About Artrya " });
    this.investorRelationsDropdown = page.getByRole("link", {
      name: "Investor Relations ",
    });
    this.contactUs = page
      .locator("#menu-item-764")
      .getByRole("link", { name: "Contact Us" });
    this.requestDemoButton = page.getByRole("link", {
      name: "Request a demonstration",
    });
    this.valuesHeading = page.getByText("Artryan value", { exact: true });
    this.cultureHeading = page.getByText("Artryan culture", { exact: true });
    this.staffImage = page.locator('img[src*="careers-collage.webp"]');
    this.dataScientistDescription = page
      .locator(".wpb_column")
      .filter({ hasText: "Senior Data Scientist – Cardiovascular" })
      .locator("p")
      .nth(3);
    this.groupPhoto = page.locator('img[src*="careers-collage-2"]');
    this.requestDemoLinkFooter = page.getByRole("link", {
      name: "Request a Demo",
      exact: true,
    });
    this.contactUsLinkFooter = page
      .locator("#page-footer")
      .getByRole("link", { name: "Contact Us", exact: true });
    this.aboutUsLinkFooter = page
      .locator("#page-footer")
      .getByRole("link", { name: "About Artrya", exact: true });
    this.investorRelationsLinkFooter = page
      .locator("#page-footer")
      .getByRole("link", { name: "Investor Relations", exact: true });
    this.xLink = page.getByRole("link", { name: "X", exact: true });
    this.linkedIn = page.getByRole("link", { name: "LinkedIn", exact: true });
    this.contactUsLinkInDisclaimer = page
      .locator(".wpb_wrapper")
      .filter({ hasText: "Salix Coronary Anatomy" })
      .getByRole("link", { name: "contact us" });
  }

  async clickJoinUsButton() {
    await this.joinUsButton.click();
  }

  async clickContactUsTodayButton() {
    await this.contactUstoday.click();
  }

  async enterFirstName(firstName: string) {
    await this.firstName.fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastName.fill(lastName);
  }

  async enterEmail(email: string) {
    await this.email.fill(email);
  }

  async clickSubmit() {
    await this.submit.click();
  }

  async clickOurSolutionsDropdown() {
    await this.ourSolutionsDropdown.click();
  }

  async openDropdown(dropdownLocator: Locator) {
    await dropdownLocator.click();
  }

  async verifyLinks(expectedTexts: string[]) {
    for (const text of expectedTexts) {
      await expect(this.page.getByRole("link", { name: text })).toBeVisible();
    }
  }
  getValuesAndCultureDescription(valuesDescription: string) {
    return this.page.getByText(valuesDescription);
  }

  // A dynamic locator that finds the entire row containing a specific title
  getEmployeeSection(title: string): Locator {
    return this.page.locator(".g-cols").filter({
      has: this.page.getByRole("heading", { name: title }),
    });
  }
  async verifyEmployeeSection(
    title: string,
    imageSrcPart: string,
    testimonial: string,
  ) {
    // 1. Target the specific text column that contains the Heading
    const textColumn = this.page.locator(".wpb_text_column").filter({
      has: this.page.getByRole("heading", { name: title }),
    });

    // 2. Locate the image relative to that specific section's parent row
    const parentRow = textColumn.locator(
      'xpath=./ancestor::div[contains(@class, "g-cols")]',
    );
    const image = parentRow.locator(`img[src*="${imageSrcPart}"]`);

    // 3. Verifications
    await expect(image).toBeVisible();
    await expect(textColumn).toContainText(testimonial);
  }

  getValuesIcon(title: string) {
    // Targets ONLY the svg inside that specific value box
    return this.page
      .locator(".w-iconbox")
      .filter({ hasText: title })
      .locator(".w-iconbox-icon svg"); // Be specific here
  }
  getValuesBulletPoints(title: string) {
    return this.page
      .locator(".w-iconbox")
      .filter({ hasText: title })
      .locator("ul li");
  }

  getValuesTitle(title: string) {
    return this.page
      .locator(".w-iconbox")
      .filter({ hasText: title })
      .locator(".w-iconbox-title");
  }

  getValuesContainer(title: string) {
    // Matches the specific box containing that title
    return this.page.locator(".w-iconbox").filter({ hasText: title });
  }

  async clickRequestDemoLink() {
    await this.requestDemoLinkFooter.click();
  }

  async clickContactusLink() {
    await this.contactUsLinkFooter.click();
  }

  async clickAboutUsLink() {
    await this.aboutUsLinkFooter.click();
  }

  async clickInvestorRelations() {
    await this.investorRelationsLinkFooter.click();
  }

  async clickXlinkIcon() {
    await this.xLink.click();
  }

  async goBack() {
    await this.page.goBack();
  }

  async clickLinkedInIcon() {
    await this.linkedIn.click();
  }

  getRegulatoryDisclaimer(fullText: string) {
    const identifier = fullText.substring(0, 30);
    return this.page.locator("span").filter({ hasText: identifier });
  }

  async clickcontactUsLinkInDisclaimer() {
    await this.contactUsLinkInDisclaimer.click();
  }

  getCopyrightContainer(copyrightText: string) {
    return this.page.locator(".wpb_wrapper").filter({ hasText: copyrightText });
  }

  getCopyrightLink(name: string) {
    return this.page.getByRole("link", { name: name });
  }
}
