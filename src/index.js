import {last} from 'lodash/fp'

const testFunc = () =>
  window.console.log('test', last([1,2,3]))

testFunc()
