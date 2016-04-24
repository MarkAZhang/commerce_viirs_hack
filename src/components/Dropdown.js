import {PropTypes} from 'react'

const Dropdown = props =>
  <select className="select" onChange={event => props.onChange(event.target.value)} value={props.val}>
    <option value="test_nums.html">Temp</option>
    <option value="just_manhattan.html">Temp2</option>
    <option value="www.google.com">Temp3</option>
  </select>

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
}

export default Dropdown
