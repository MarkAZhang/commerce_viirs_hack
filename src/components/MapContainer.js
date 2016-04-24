import {Component, PropTypes} from 'react'
import {withState} from 'recompose'
import Map from './Map'
import Select from './Select'

class MapContainer extends Component {
  static propTypes = {
    initialSrc: PropTypes.string,
  }

  state = {
    src: ''
  }

  componentWillMount() {
    if (this.props.initialSrc) {
      this.setState({src: this.props.initialSrc})
    }
  }

  render() {
    return (
      <div className="mapContainer">
        <Select val={this.state.src} onChange={val => this.setState({src: val})} />
        <Map src={this.state.src} />
      </div>
    )
  }
}

export default MapContainer
