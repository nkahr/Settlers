import React, { Component } from 'react'

class PortComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let portStyle = {
      left: this.props.coordinates[0],
      top: this.props.coordinates[1],
      transform: 'rotate('+this.props.angle+'deg)'
    }

    return (
      <div value={this.props.index}>
        <img src={require('file-loader!../public/img/'+this.props.type+'_port.png')} style={portStyle} className='port'/>
      </div>
    )
  }

}

export default PortComponent