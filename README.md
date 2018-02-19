# vue-lite-kit

[![npm](https://img.shields.io/npm/v/vue-lite-kit.svg) ![npm](https://img.shields.io/npm/dm/vue-lite-kit.svg)](https://www.npmjs.com/package/vue-lite-kit)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Handy components kit for building Vue JS based applications

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

# Installation

```
npm install --save vue-lite-kit
```

## Default import

Install all the components:

```javascript
import Vue from 'vue'
import VueLiteKit from 'vue-lite-kit'

Vue.use(VueLiteKit)
```

Use specific components:

```javascript
import Vue from 'vue'
import { Test } from 'vue-lite-kit'

Vue.component('test', Test)
```

**⚠️ A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.**

## Distribution import

Install all the components:

```javascript
import 'vue-lite-kit/dist/vue-lite-kit.css'
import VueLiteKit from 'vue-lite-kit/dist/vue-lite-kit.common'

Vue.use(VueLiteKit)
```

Use specific components:

```javascript
import 'vue-lite-kit/dist/vue-lite-kit.css'
import { Test } from 'vue-lite-kit/dist/vue-lite-kit.common'

Vue.component('test', Test)
```

**⚠️ You may have to setup your bundler to embed the css file in your page.**

## Browser

```html
<link rel="stylesheet" href="vue-lite-kit/dist/vue-lite-kit.css"/>

<script src="vue.js"></script>
<script src="vue-lite-kit/dist/vue-lite-kit.browser.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually with the instructions below.

Install all the components:

```javascript
Vue.use(VueLiteKit)
```

Use specific components:

```javascript
Vue.component('test', VueLiteKit.Test)
```

## Source import

Install all the components:

```javascript
import Vue from 'vue'
import VueLiteKit from 'vue-lite-kit/src'

Vue.use(VueLiteKit)
```

Use specific components:

```javascript
import Vue from 'vue'
import { Test } from 'vue-lite-kit/src'

Vue.component('test', Test)
```

**⚠️ You need to configure your bundler to compile `.vue` files.** More info [in the official documentation](https://vuejs.org/v2/guide/single-file-components.html).

# Usage

> TODO

# Example

> TODO

---

# Plugin Development

## Installation

The first time you create or clone your plugin, you need to install the default dependencies:

```
npm install
```

## Watch and compile

This will run webpack in watching mode and output the compiled files in the `dist` folder.

```
npm run dev
```

## Use it in another project

While developping, you can follow the install instructions of your plugin and link it into the project that uses it.

In the plugin folder:

```
npm link
```

In the other project folder:

```
npm link vue-lite-kit
```

This will install it in the dependencies as a symlink, so that it gets any modifications made to the plugin.

## Publish to npm

You may have to login to npm before, with `npm adduser`. The plugin will be built in production mode before getting published on npm.

```
npm publish
```

## Manual build

This will build the plugin into the `dist` folder in production mode.

```
npm run build
```

---

## License

[MIT](http://opensource.org/licenses/MIT)
