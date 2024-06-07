# A very small test application for demonstrating issue with Rspack + Module Federation + Trusted Types

Module Federation in Rspack does not currently support [Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API).

We can see how this does not work when Trusted Types are required, but does when they are not.

1. install dependencies: `yarn`
2. build the packages: `yarn build`
3. start the server: `yarn start`
4. navigate to [http://localhost/](http://localhost/)
5. app is unable to load due to `This document requires 'TrustedScript' assignment.` error in console.

## Disable Trusted Types

1. open packages/host/serve.json and change `Content-Security-Policy` to `XXXContent-Security-Policy`
2. repeat steps above and now see the the app loads successfully now that the CSP for Trusted Types is not defined in the header.
