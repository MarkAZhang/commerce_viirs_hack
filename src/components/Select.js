import {PropTypes} from 'react'
import {withState} from 'recompose'
import FontAwesome from 'react-fontawesome'
import {find, matchesProperty} from 'lodash/fp'

const OPTIONS = [
  {
    value: 'chi_build.html',
    label: 'Chicago - New Building Permits',
    icon: 'building'
  },
  {
    value: 'chi_light.html',
    label: 'Chicago - Mean Nighttime Brightnesss',
    icon: 'lightbulb-o'
  },
  {
    value: 'nyc_build.html',
    label: 'NYC - New Building Permits',
    icon: 'building'
  },
  {
    value: 'nyc_light.html',
    label: 'NYC - Mean Nighttime Brightness',
    icon: 'lightbulb-o'
  },
]

const getLabelForValue = value => find(matchesProperty('value', value), OPTIONS).label
const getIconForValue = value => find(matchesProperty('value', value), OPTIONS).icon

const Dropdown = props =>
  <div className="select">
    <div className="selectButton" onClick={() => props.setOpen(!props.open)}>
      <FontAwesome name={getIconForValue(props.val)} />
      <div className="label">{getLabelForValue(props.val)}</div>
      <FontAwesome name={props.open ? 'angle-up' : 'angle-down'} />
    </div>
    {props.open &&
      <div className="dropdown">
        {OPTIONS.map(option =>
          <div key={option.value} className="option" onClick={() => {
            props.onChange(option.value);
            props.setOpen(false);
          }}>
            <FontAwesome name={option.icon} />
            <div className="label">{option.label}</div>
          </div>
        )}
      </div>
    }
  </div>

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default withState('open', 'setOpen', false)(Dropdown)
