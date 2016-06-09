
# redux-effects-media

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Effect driver for listening to media query changes in javascript

## Installation

    $ npm install redux-effects-media

## Usage

You can setup actions to be dispatched whenever the status of a media query changes, like this:

```javascript
import {watchMedia} from 'redux-effects-media'
import createAction from '@f/create-action'
import {dispatch} from './store'

const mediaChanged = createAction('Media query changed')

dispatch(watchMedia({
  portrait: '(orientation: portrait)'
  landsacpe: '(orientation: landscape)'
}), mediaChanged)
```

Anytime one of the media queries in your keyed map changes the action creator specified in the second parameter will have its action dispatched with a payload of the form `{key, matches}`, where the key is the name you gave that query in your object, and `matches` is whether or not the query is currently matching.

## License

MIT
