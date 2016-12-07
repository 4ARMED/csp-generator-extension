# Google Chrome Extension for 4ARMED's Content Security Policy Generator

This is a Google Chrome Extension for interacting with 4ARMED's [CSP Generator](https://github.com/4armed/csp-generator).

## Installation

1. Clone this repository

   ```shell
   $ git clone https://github.com/4armed/csp-generator-extension
   ```

2. Enable Developer Mode in [chrome://extensions](chrome://extensions)

3. Load unpacked extension from the cloned csp-generator-extension directory.

## Things to consider

We highly recommend you create a new Google Chrome user for this extension. The reasons are two-fold:

1. We need a lot of permissions in order to run this extension:

   ```
     "permissions": [
    "webRequest",
    "webRequestBlocking",
    "http://*/*",
    "https://*/*",
    "storage",
    "tabs"
   ],
   ```

  You can see the code for yourself, it's perfectly benign but it's alpha-level code and could break things so it may not be something you are comfortable installing into your main profile with all your Internet Banking, etc :-)

2. It removes existing CSP headers for all responses, not per site. It's therefore best to work on one site at a time or you'll end up with the CSP for one site creating violations on another.

## Configuration

There are only two options for this extension, both can be configured from the [chrome://extensions](chrome://extensions) page by clicking Options.

1. CSP Generator URL

   By default this will use our live deployment at https://csp.4armed.io. If you are running your own copy, perhaps in Docker somewhere, set the URL here. Make sure you don't include the trailing slash in the URL and ensure the URL points to the root of the installation. Basically the value is appended with /report and /policy for the different actions.

2. Unsafe

   By default, when you generate a CSP using the API it will not include unsafe-inline or unsafe-exec. If you want to include these you need to pass ?unsafe=1 to the API and this can be done by ticking the checkbox for this option.

## Using

See the video on YouTube at https://youtu.be/nr5PFxDm3uo. It really is the easiest way to see what it does!

## Fork it!

Please do feel free to submit changes. Please fork this repo and send a pull request from a dedicated branch.

