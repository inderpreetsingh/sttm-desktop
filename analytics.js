const ua = require('universal-analytics'); // https://www.npmjs.com/package/universal-analytics
const isOnline = require('is-online');

const trackingId = 'UA-45513519-12';

class Analytics {
  constructor(userId, store) {
    if (trackingId) {
      this.usr = ua(trackingId, userId);
      this.store = store;
    }
  }

  /**
   * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   * Name           | type | required | example
   * ------------------------------------------
   * eventCategory  | text |  yes     | Typically the object that was interacted with (e.g. 'Video')
   * eventAction    | text |  yes     | The type of interaction (e.g. 'play')
   * eventLabel     | text |  no      | Useful for categorizing events (e.g. 'Fall Campaign')
   * eventValue     | int  |  no      | A numeric value associated with the event (e.g. 42)
   * @param category
   * @param action
   * @param label
   * @param value
   */
  trackEvent(category, action, label, value) {
    if (process.env.NODE_ENV !== 'development') {
      if (this.store.get('userPrefs.app.analytics.collect-statistics')) {
        isOnline().then((online) => {
          // TODO: for offline users, come up with a way of storing and send when online.
          if (online && this.usr) {
            this.usr
              .event({
                ec: category,
                ea: action,
                el: label,
                ev: value,
              })
              .send();
          }
        });
      }
    } else {
      console.log(`Tracking Event suppressed for development ec: ${category}, ea: ${action}, el: ${label}, ev: ${value}`);
    }
  }


  /**
   *
   * @param path
   * @param title
   * @param hostname
   */
  trackPageView(path, title, hostname = 'SikhiToTheMax Desktop') {
    if (process.env.NODE_ENV !== 'development') {
      if (this.store.get('userPrefs.app.analytics.collect-statistics')) {
        isOnline().then((online) => {
          if (online && this.usr) {
            this.usr
              .pageview({
                dp: path,
                dt: title,
                dh: hostname,
              })
              .send();
          }
        });
      }
    } else {
      console.log('Tracking Page suppressed for development');
    }
  }
}

module.exports = Analytics;