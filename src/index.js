/**
 * Imports
 */

import forEach from '@f/foreach-obj'

/**
 * Action types
 */

const WATCH_MEDIA = '@@REDUX_EFFECTS/WATCH_MEDIA'

/**
 * redux-effects-media
 */

function middleware ({dispatch}) {
  // This middleware is a noop for non-browser environments
  if (typeof window === 'undefined') {
    return next => action => next(action)
  }

  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

  // Don't load the polyfill unless the middleware is actually going to be used. We don't want just requiring the
  // package (e.g. to grab the action creator) to break on the server.
  require('matchmedia-polyfill')
  require('matchmedia-polyfill/matchMedia.addListener')

  return next => action => {
    if (action.type === WATCH_MEDIA) {
      const {queries, cb} = action.payload

      forEach((mq, key) => {
        const mql = matchMedia(mq)
        mql.addListener(mql => dispatch(cb({key, matches: mql.matches})))

        if (mq === 'print' && isFirefox) {
          // Correct for the fact that media query listeners do not work with printing
          // in firefox, but these before/after print queries do
          window.addEventListener('beforeprint', () => dispatch(cb({key, matches: true})))
          window.addEventListener('afterprint', () => dispatch(cb({key, matches: false})))
        }

        dispatch(cb({key, matches: mql.matches}))
      }, queries)
    } else {
      return next(action)
    }
  }
}

/**
 * Actions
 */

function watchMedia (queries, cb) {
  return {
    type: WATCH_MEDIA,
    payload: {queries, cb}
  }
}

/**
 * Exports
 */

export default middleware
export {
  watchMedia
}
