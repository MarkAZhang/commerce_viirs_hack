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
    label: 'Chicago - Mean Nighttime Brightness',
    icon: 'lightbulb-o'
  },
  {
    value: 'chi_density.html',
    label: 'Chicago - Population Density',
    icon: 'users'
  },
  {
    value: 'chi_pred.html',
    label: 'Chicago - Permit Future Prediction',
    icon: 'line-chart'
  },
  {
    value: 'chi_pred_cross.html',
    label: 'Chicago - Permit Cross Prediction',
    icon: 'random'
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
  {
    value: 'nyc_density.html',
    label: 'NYC - Population Density',
    icon: 'users'
  },
  {
    value: 'nyc_pred.html',
    label: 'NYC - Permit Future Prediction',
    icon: 'line-chart'
  },
  {
    value: 'nyc_pred_cross.html',
    label: 'NYC - Permit Cross Prediction',
    icon: 'random'
  },
]

const getLabelForValue = value => find(matchesProperty('value', value), OPTIONS).label
const getIconForValue = value => find(matchesProperty('value', value), OPTIONS).icon

const Dropdown = props =>
  <div className="select">
    <div className="selectButton" onClick={() => props.setOpen(!props.open)}>
      <div className="icon">
        <FontAwesome name={getIconForValue(props.val)} />
      </div>
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
            <div className="icon">
              <FontAwesome name={option.icon} />
            </div>
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
