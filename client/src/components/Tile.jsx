import React from 'react'

class Tile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return (
        <div id="tile">
          <img src={require('file-loader!../public/img/hexagon-'+this.props.colour+'.png')} className="tile"/>
        </div>
    )
  }
}

export default Tile
