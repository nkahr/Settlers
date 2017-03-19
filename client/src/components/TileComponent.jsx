import React from 'react'

class TileComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }
  
  render() {
    let hexStyle = {
      left: this.props.coordinates[0],
      top: this.props.coordinates[1]
    }
    let component = <img src={require('file-loader!../public/img/hexagon_'+this.props.resource+'.png')} style={hexStyle} id='tile'/>
    // console.log('comp', component)
    return (
      <div>
        {component}
      </div>
    )
  }
}

export default TileComponent
