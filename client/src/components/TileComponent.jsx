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
    let component = <img src={require('file-loader!../public/img/hexagon-'+this.props.resource+'.png')} id={this.props.id}/>
    console.log('comp', component)

    // component.style.top = this.props.coordinates[0]
    return (
      <div id="tile">
        {component}
      </div>
    )
  }
}

export default TileComponent
