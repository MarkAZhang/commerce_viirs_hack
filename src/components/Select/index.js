import {PropTypes} from 'react'
import {withState} from 'recompose'
import FontAwesome from 'react-fontawesome'
import {find, matchesProperty} from 'lodash/fp'
import cs from './styles'
import OPTIONS from './options'

const getLabelForValue = value => find(matchesProperty('value', value), OPTIONS).label
const getIconForValue = value => find(matchesProperty('value', value), OPTIONS).icon

const Select = props =>
  <div className={cs.select}>
    <div className={cs.selectButton} onClick={() => props.setOpen(!props.open)}>
      <div className={cs.icon}>
        <FontAwesome name={getIconForValue(props.val)} />
      </div>
      <div className={cs.label}>{getLabelForValue(props.val)}</div>
      <FontAwesome name={props.open ? 'angle-up' : 'angle-down'} />
    </div>
    {props.open &&
      <div className={cs.dropdown}>
        {OPTIONS.map(option =>
          <div
            key={option.value} className={cs.option} onClick={() => {
              props.onChange(option.value)
              props.setOpen(false)
            }}
          >
            <div className={cs.icon}>
              <FontAwesome name={option.icon} />
            </div>
            <div className={cs.label}>{option.label}</div>
          </div>
        )}
      </div>
    }
  </div>

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default withState('open', 'setOpen', false)(Select)
