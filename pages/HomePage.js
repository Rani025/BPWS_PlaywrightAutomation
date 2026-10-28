export class HomePage {
  constructor(page) {
    this.page = page;
    this.lmsLink = page.getByRole('link', { name: /LMS/ });
  }

  async openLms() {
    const lmsPagePromise = this.page.context().waitForEvent('page');
    await this.lmsLink.click();
    const lmsPage = await lmsPagePromise;
    await lmsPage.waitForLoadState('domcontentloaded');
    return lmsPage;
  }
}
