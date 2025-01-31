import { test, expect } from "@playwright/test";

test("has hello", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByText("Hello", { exact: true })).toBeVisible();
});

test("has world", async ({ page }) => {
  await page.evaluate(() => {
    const { worker, http, HttpResponse } = window.msw;
    worker.use(
      ...[
        http.get("/greeting", () => {
          return HttpResponse.json("World");
        }),
      ]
    );
  });

  await page.goto("http://localhost:3000");

  await expect(page.getByText("World", { exact: true })).toBeVisible();
});
