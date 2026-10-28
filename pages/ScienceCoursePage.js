import { expect } from '@playwright/test';

export class ScienceCoursePage {
  constructor(page) {
    this.page = page;
    this.weekToggle = page.getByRole('button', {
      name: '26 October - 1 November',
    });
    this.resourceLink = page
      .locator('li.section')
      .filter({ hasText: '26 October - 1 November' })
      .getByRole('link', { name: /Resources- Journey to states of water/ })
      .last();
    this.documentLink = page.locator(
      'a[href*="Grade_6_States_of_Water_All_Questions_Answered_Scientific_Vocabulary.docx"]',
    );
  }

  async openWeekPanel() {
    if (!(await this.resourceLink.isVisible())) {
      await this.weekToggle.click();
    }
    await expect(this.resourceLink).toBeVisible();
  }

  async openResourceFolder() {
    await this.resourceLink.click();
    await expect(this.documentLink).toBeVisible();
  }

  async downloadWaterStatesDocument(destination) {
    const downloadPromise = this.page.waitForEvent('download');
    await this.documentLink.click();
    const download = await downloadPromise;
    await download.saveAs(destination);
    return download.suggestedFilename();
  }
}
