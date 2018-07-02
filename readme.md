# Unchained UI

## App

[![NPM Version](https://img.shields.io/npm/v/uc-app.svg?style=flat-square)](https://www.npmjs.com/package/uc-app)
[![NPM Downloads](https://img.shields.io/npm/dt/uc-app.svg?style=flat-square)](https://www.npmjs.com/package/uc-app)

Simple yet powerful application class for a browser.

### Usage

```js
import app from 'uc-app';

app.init({ container: 'body' }, () => {
  // here is your app is ready
  // probably somethnig like this:
  app.router.start();
});

```

### API

You can use any API adapter.

```js
app.api(adapter);
```

The adapter should complain interface:

* call() - makes the api call.
* app() - gives your adapter access to the app instance.
* host — string, is the full api host name.

The app will add following methods to your adapter:

* log(level, ...args) — to log.
* emit(event, ...args) — to emit events.

### Router

`app.router`

For more info go to [uc-router](https://github.com/unchainedui/router)

### DOM

For more info on following methods go to [uc-dom](https://github.com/unchainedui/dom)

* addClass
* removeClass
* toggleClass
* replaceClass
* appendTo
* prependTo
* insertBefore
* insertAfter
* find
* attr

### Events

#### on(event, handler[, context])

Adds the event `handler` to the `event`. You can use `context` to set `this` context for the handler. Returns the class instance so you can chain the calls.

#### once(event, handler[, context])

Same as the above but fires only once.

#### off(event, handler[, context])

Removes the event `handler` to the `event`. You should pass the `context` if you subscribed to the event with context. Returns the class instance so you can chain the calls.

#### emit(event, ...args)

Emits the event

### Log

#### log(level, ...args)

Logs all `args` into console if `level` is smaller than `logLevel` property of the class.

### Properties

* **logLevel** - number, defines the maximum log level to be printed out
* **logName** - string, if defined will be prepended to every log line

#### Log levels

```js
const LOG_LEVEL = {
  NONE: 0,
  ALERT: 1,
  CRITICAL: 2,
  ERROR: 3,
  WARNING: 4,
  NOTICE: 5,
  INFO: 6,
  DEBUG: 7,
  ALL: 255
}
```

### Storage

`app.storage` — JSON local storage [uc-storage](https://github.com/unchainedui/storage)

### Cookie

`app.cookie` — access to the cookies [uc-cookies](https://github.com/unchainedui/cookie)

License MIT

© velocityzen

