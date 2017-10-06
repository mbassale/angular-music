// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: '/',
  spotifyClientId: '59f43d2b99e34aa991c72ffcb99e287a',
  spotifyAuthCallback: 'http://localhost:4200/login'
};
