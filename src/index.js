import {last} from 'lodash/fp'

testFunc = () =>
  window.console.log('test', last([1,2,3]))

testFunc()
