import React from 'react'

class TileComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  // componentWillMount() {
  //   let element = document.getElementById('tile')
  //   console.log(element)
  //   element.style.top = this.props.coordinates[0]
  // }

  render() {
    let hexStyle = {
      left: this.props.coordinates[0],
      top: this.props.coordinates[1]
    }
    let component = <img src={require('file-loader!../public/img/hexagon_'+this.props.resource+'.png')} style={hexStyle} id='tile'/>
    console.log('comp', component)

    // component.style.top = this.props.coordinates[0]
    return (
      <div>
        {component}
      </div>
    )
  }
}

export default TileComponent
