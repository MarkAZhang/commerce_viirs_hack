import Main from '~/app/Main'
import {render} from 'react-dom'
import cs from './index.css'

const rootElement = document.createElement('div')
rootElement.className = cs.page
document.body.appendChild(rootElement)

// Render it
render(<Main />, rootElement)
