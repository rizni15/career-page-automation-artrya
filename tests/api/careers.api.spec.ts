import { test, expect } from "@playwright/test";

test("verify careers page API status and headers", async ({ request }) => {
  // 1. Send the GET request
  const response = await request.get("https://artrya.com/careers/", {
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    },
  });

  // 2. Verify Status Code is 200
  expect(response.status()).toBe(200);

  // 3. Verify Content Type header
  expect(response.headers()["content-type"]).toContain("text/html");

  // 4. Verify the body contains expected text
  const body = await response.text();
  expect(body).toContain("<title>Careers");
});
