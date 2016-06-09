/**
 * Imports
 */

import {createStore, applyMiddleware} from 'redux'
import combineReducers from '@f/combine-reducers'
import handleActions from '@f/handle-actions'
import middleware, {watchMedia} from '../src'
import test from 'tape'

/**
 * Tests
 */

test('should work', t => {
  const reducer = combineReducers({
    media: handleActions({
      MEDIA_CHANGED: (state, {key, matches}) => state === key
        ? matches ? key : null
        : matches ? key : state
    })
  })
  const store = createStore(reducer, {}, applyMiddleware(middleware))

  t.deepEqual(store.getState(), {})

  store.dispatch(watchMedia({
    portrait: '(orientation: portrait)'
  }, payload => ({type: 'MEDIA_CHANGED', payload})))

  t.deepEqual(store.getState(), {media: 'portrait'})
  t.end()
})
