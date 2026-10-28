import { expect } from '@playwright/test';

export class MyCoursesPage {
  constructor(page) {
    this.page = page;
    this.myCoursesLink = page.getByRole('menuitem', { name: 'My courses' });
  }

  async open() {
    await this.myCoursesLink.click();
    await this.page.waitForURL(/\/my\/courses\.php/);
  }

  async openScienceCourse() {
    const courseLink = this.page
      .locator('a.coursename')
      .filter({ hasText: 'Gr 6 - SCIENCE' });
    await expect(courseLink).toBeVisible({ timeout: 30_000 });

    const courseHref = await courseLink.getAttribute('href');
    if (!courseHref) {
      throw new Error('Could not find the Grade 6 Science course URL.');
    }

    await this.page.goto(new URL(courseHref, this.page.url()).toString());
    await expect(
      this.page.getByRole('heading', { name: 'Gr 6 - SCIENCE', exact: true }),
    ).toBeVisible();
  }
}
