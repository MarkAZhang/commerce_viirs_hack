import {Component, PropTypes} from 'react'
import {withState} from 'recompose'
import Select from '~/components/Select'
import cs from './styles'

const Map = props =>
  <div className={cs.iframeContainer}>
    <iframe className={cs.iframe} src={props.src} frameBorder="0"></iframe>
  </div>

Map.propTypes = {
  src: PropTypes.string.isRequired,
}

class MapViz extends Component {
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
      <div className={cs.mapContainer}>
        <Select val={this.state.src} onChange={val => this.setState({src: val})} />
        <Map src={this.state.src} />
      </div>
    )
  }
}

export default MapViz
