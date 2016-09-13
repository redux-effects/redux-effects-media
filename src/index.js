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
  // Don't load the polyfill unless the middleware is actually going to be used. We don't want just requiring the
  // package (e.g. to grab the action creator) to break on the server.
  require('matchmedia-polyfill')
  require('matchmedia-polyfill/matchMedia.addListener')

  return next => action => {
    if (action.type === WATCH_MEDIA) {
      return doWatch(action.payload)
    }

    return next(action)
  }

  /**
   * doWatch
   */

  function doWatch ({queries, cb}) {
    forEach(
      (mq, key) => {
        const mql = matchMedia(mq)
        mql.addListener(mql => dispatch(cb({key, matches: mql.matches})))
        dispatch(cb({key, matches: mql.matches}))
      },
      queries
    )
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
