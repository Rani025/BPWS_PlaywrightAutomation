export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByRole('textbox', { name: 'Username' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async open() {
    await this.page.goto('https://bvbsharjah.bhavansmiddleeast.com/BVBSHARJAH/');
  }

  async signIn(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForURL(/EasyConnectWeb/);
  }
}
