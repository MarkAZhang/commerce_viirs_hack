import {last} from 'lodash/fp'
import {fetchJson} from './api'
import './style.css'

fetchJson('just_manhattan.json').then((data) => {
  window.console.log('data', data)
})
