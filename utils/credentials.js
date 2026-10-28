export function getCredentials() {
  const { PORTAL_USERNAME, PORTAL_PASSWORD } = process.env;

  if (!PORTAL_USERNAME || !PORTAL_PASSWORD) {
    throw new Error(
      'Set PORTAL_USERNAME and PORTAL_PASSWORD environment variables before running the tests.',
    );
  }

  return { username: PORTAL_USERNAME, password: PORTAL_PASSWORD };
}
