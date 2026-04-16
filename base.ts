import { test as base } from "@playwright/test";
import { CareersPage } from "./pom/careersPage";

type CustomFixtures = {
  careersPage: CareersPage;
};

export const test = base.extend<CustomFixtures>({
  careersPage: async ({ page }, use) => {
    const careersPage = new CareersPage(page);
    await use(careersPage);
  },
});

export { expect } from "@playwright/test";
