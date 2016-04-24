import {Component, PropTypes} from 'react'
import {withState} from 'recompose'
import Dropdown from './Dropdown'
import Map from './Map'

class MapContainer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    setSrc: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="map-container">
        <Dropdown val={this.props.src} onChange={this.props.setSrc} />
        <Map src={this.props.src} />
      </div>
    )
  }
}

export default withState(
  'src', 'setSrc', 'chi_build.html'
)(MapContainer)
