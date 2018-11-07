import compose from 'uc-compose';
import { get, on, off } from 'uc-dom';
import html from 'uc-dom/methods';
import cookie from 'uc-cookie';
import events from 'uc-events';
import Router from 'uc-router';
import { log, LOG_LEVEL } from 'uc-log';
import { localStorage, JSONStorage } from 'uc-storage'

export const App = function() {
  this.events = {};
  this.state = {};
  this.router = new Router((name, params) => {
    this.emit(`app.route.${name}`, params)
    this.emit('app.route', name, params)
  });
};

App.prototype = compose(
  html,
  events,
  log,
  {
    logName: 'app',
    logLevel: LOG_LEVEL.NONE,

    storage: JSONStorage(localStorage),
    cookie: cookie,

    init: function(settings = {}, cb) {
      if (settings.logLevel) {
        this.logLevel = settings.logLevel;
      }

      if (settings.logName) {
        this.logName = settings.logName;
      }

      this.container(settings.container);

      if (this.api) {
        this.api.init(() => this.didInit(cb))
      } else {
        this.didInit(cb);
      }

      return this;
    },

    didInit: function(cb) {
      setTimeout(() => {
        cb && cb();
        this.emit('app.ready');
      }, 0);
    },

    setAPI: function(api) {
      this.api = api;
      this.call = (...args) => api.call(...args);
      this.host = () => api.host;
      api.log = (...args) => this.log(...args);
      api.emit = (...args) => this.emit(...args);
      api.setApp(this);
      return this;
    },

    isAuthenticated: function(...args) {
      if (!this.api) {
        return null;
      }

      return this.api.isAuthenticated(...args);
    },

    routes: function(routes) {
      for (const route in routes) {
        this.router.add(route, routes[route]);
      }
      return this;
    },

    start: function() {
      this.router.start()
    },

    go: function(...args) {
      this.router.go(...args);
    },

    container: function(container) {
      if (typeof container === 'string') {
        const el = get(container);
        // if it is HTMLCollection or NodeList;
        this.el = el.forEach ? el.item(0) : el;
      } else {
        this.el = container;
      }

      const router = this.router;
      this.onclick = on(this.el, 'click', '[soft]', function(e) {
        e.preventDefault();
        router.go(this.pathname);
      });
    },

    remove: function() {
      off(this.el, 'click', this.onclick);
      delete this.el;
      this.router.remove();
    }
  }
);

export default new App();
