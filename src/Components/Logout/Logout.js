import React, { Component } from 'react';
import { connect } from 'react-redux';
import { leave } from '../../store/reducer/actionUser'
import '../../css/Logout.css'
class logout extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.logout();
      this.props.history.replace('/')
    }, 2000)

  }
  render() {
    return (
      <div className="all">
      <div className="shadow">תודה  </div>
      <div className="shadow"> ויום טוב  </div>
      </div>
    )
  }
}
const mapDispatcToProps = dispatch => {
  return {
    logout: () => dispatch(leave())
  }
}
const mapStateToProps = state => {
  return {
    userPath: state.user.UserPath

  }
}
export default connect(mapStateToProps, mapDispatcToProps)(logout);




