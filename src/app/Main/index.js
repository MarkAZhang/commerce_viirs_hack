import FontAwesome from 'react-fontawesome'
import MapViz from '~/components/MapViz'
import cs from './styles'

const Main = props =>
  <div className={cs.content}>
    <div className={cs.header}>
      <div className={cs.title}>Using Satellite Data to Estimate Construction Activity</div>
      <a href='https://github.com/MarkAZhang/commerce_viirs_hack'>
        <FontAwesome name='github' className={cs.githubIcon} />
      </a>
    </div>
    <div className={cs.maps}>
      <MapViz initialSrc='chi_light.html'/>
      <MapViz initialSrc='chi_build.html'/>
    </div>
  </div>

export default Main
