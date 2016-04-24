import {last} from 'lodash/fp'
import './style.css'

const testFunc = () =>
  window.console.log('test', last([1,2,3]))

testFunc()
