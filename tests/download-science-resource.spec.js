import { test, expect } from '@playwright/test';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { MyCoursesPage } from '../pages/MyCoursesPage.js';
import { ScienceCoursePage } from '../pages/ScienceCoursePage.js';
import { getCredentials } from '../utils/credentials.js';

const projectDirectory = fileURLToPath(new URL('../', import.meta.url));

test('download the Grade 6 science water-states resource', async ({ page }) => {
  const { username, password } = getCredentials();
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.signIn(username, password);

  const homePage = new HomePage(page);
  const lmsPage = await homePage.openLms();
  const coursesPage = new MyCoursesPage(lmsPage);
  await coursesPage.open();
  await coursesPage.openScienceCourse();

  const scienceCoursePage = new ScienceCoursePage(lmsPage);
  await scienceCoursePage.openWeekPanel();
  await scienceCoursePage.openResourceFolder();

  const destination = path.join(
    projectDirectory,
    'downloads',
    'Grade_6_States_of_Water_All_Questions_Answered_Scientific_Vocabulary.docx',
  );
  const filename = await scienceCoursePage.downloadWaterStatesDocument(destination);

  expect(filename).toBe(
    'Grade_6_States_of_Water_All_Questions_Answered_Scientific_Vocabulary.docx',
  );
  expect((await stat(destination)).size).toBeGreaterThan(0);
});
