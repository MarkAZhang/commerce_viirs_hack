import {PropTypes} from 'react'

const Dropdown = props =>
  <select className="select" onChange={event => props.onChange(event.target.value)} value={props.val}>
    <option value="chi_build.html">Chicago Tracts - New Building Permits</option>
    <option value="chi_light.html">Chicago Tracts - Mean Nighttime Brightness</option>
    <option value="nyc_build.html">NYC Tracts - New Building Permits</option>
    <option value="nyc_light.html">NYC Tracts - Mean Nighttime Brightness</option>
  </select>

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
}

export default Dropdown
