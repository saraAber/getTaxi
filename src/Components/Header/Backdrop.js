import React from 'react'
import '../../css/Backdrop.css'
 class Backdrop extends React.Component {
  render(){
    return(
      <div
        className="backdrop"
        onClick={this.props.close}
      />
    )
  }
}
export default Backdrop