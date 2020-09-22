import React, { Component } from 'react';
import { connect } from 'react-redux';
import { leave } from '../../store/reducer/actionUser'
class logout extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.logout();
      this.props.history.replace('/')
      // return '/'
    }, 2000)

  }
  render() {
    return (
    <div>
      <div>!תודה רבה</div>
      <div>...ולהתראות</div>
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




