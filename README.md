# Headless Shopify demo store

Littledata's app tracks your checkout and orders server-side. To link these events on Shopify with the user's pre-checkout visit on a headless site you just need a few extra setup steps.

## See it in action: https://headlessdemo.littledata.io

### Segment vs GA

Including `?segment=true` in the URL switches to the guide for our [Segment app](https://apps.shopify.com/segment-com-by-littledata), or you can use the button in the header to switch platform

### Using Nacelle?

Nacelle has developed an [NPM package](https://www.npmjs.com/package/@nacelle/nacelle-littledata-nuxt-module) to automate steps 4 and 5.

### Simulating an order with missing cart attributes

Adding `sendClientId=false` to the URL parameters will cause the private app NOT to add cart attributes, and as a result the order will come through with no `note_attributes` field.
