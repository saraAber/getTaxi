import React, { Component } from 'react'
import { Form,  Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import TextField from '@material-ui/core/TextField';
 import Grid from '@material-ui/core/Grid';
 import '../../../css/LoginForm.css'

class loginForm extends Component {
  render() {
    let messages
    let err
    return (
      <Grid textalign='center' style={{ height: '100vh' }} verticalalign='middle' >
        <Grid   id="MuiGrid-root-login"  >
          <Header as='h2' color='red' textalign='center'>
            התחבר לחשבונך
      </Header>
          <Form size='large' onSubmit={(event) => this.props.submit(event)}>
            <Segment stacked>
              {
                this.props.stateProps.map((x,i) => {
                  if (this.props.messages) { !x.config.valid ? messages = <p key={i}>{x.config.message}</p> : messages = <p>{null}</p> }
                    err = <p key={i}>{this.props.error}</p>
                  return (<div key={i}>
                    <TextField
                     id="input-with-icon-grid" 
                      color="secondary"
                      key={x.id}
                        label={x.config.placeholder}
                        placeholder={x.config.placeholder}
                        type={x.config.type}
                        onChange={(event) => this.props.changed(event, x.id)}
                        value={x.config.value}
                        required={true}
                        title={x.config.title}                               
          ></TextField>

                    {messages}
                   
                  </div>)
                }) 
              }
               {err}
              <input id="login" type="submit" color='red' value="התחבר" size='large' disabled={this.props.loading} />
            </Segment>
          </Form>

          <Message>
            חדש אצלינו ?<Link to={`${this.props.userpath}/signup`}> הירשם </Link>
          </Message>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    userpath: state.user.UserPath
  }
}
export default withRouter(connect(mapStateToProps)(loginForm))