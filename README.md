# BPWS Playwright Automation

The project uses Playwright's Page Object Model (POM). The test signs in to the
school portal, opens LMS and My courses, navigates to Grade 6 Science and its
26 October–1 November panel, then saves the water-states resource to `downloads/`.

## Setup

From this directory, install the packages and Chromium:

```powershell
npm install
npx playwright install chromium
```

Set credentials in the current PowerShell session. Do not commit credentials or
put them in test source files:

```powershell
$env:PORTAL_USERNAME = Read-Host "Portal username"
$secret = Read-Host "Portal password" -AsSecureString
$env:PORTAL_PASSWORD = [System.Net.NetworkCredential]::new("", $secret).Password
```

Run the automation:

```powershell
npm test
```

The downloaded document is saved as
`downloads/Grade_6_States_of_Water_All_Questions_Answered_Scientific_Vocabulary.docx`.
Keep the credentials private and clear the environment variables after use:

```powershell
Remove-Item Env:PORTAL_USERNAME, Env:PORTAL_PASSWORD
```

## Suggested test cases

- Sign in with valid credentials and confirm navigation to the authenticated
  portal.
- Reject invalid credentials and verify the portal displays its login error.
- Open LMS and My courses, then confirm the Grade 6 Science course is listed.
- Open Grade 6 Science and verify the expected course heading.
- Expand the 26 October–1 November panel and confirm its resource folder appears.
- Open the resource folder and verify the expected water-states document is
  available.
- Download the document and verify its filename, non-zero size, and `.docx`
  extension.
- Verify a missing portal username or password produces a clear setup error.
