import React, { Component } from 'react'
import { Button, TransitionablePortal,Form, Grid, Header, Segment } from 'semantic-ui-react'
import Address from '../../../Orders/Order/AddressInput'

class signupForm extends Component {
  state={
    placeholder_from: "Address from",
    open: false,
    flag: false 
  }
  handleClick = () => {
    if (this.props.IsCorrect)
      this.setState((prevState) => ({ open: !prevState.open }))
  }
  handleClose = () => this.setState({ open: false })
  componentDidUpdate() {
    if (!this.state.open && this.props.IsCorrect && !this.state.flag) {
      this.setState({ open: true,flag: true })
    }
  }
  render() {
    const { open } = this.state
    let messages
    let err
    
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {this.props.value}
          </Header>
          <Form size='large' onSubmit={(event) => this.props.submit(event)}>
            <Segment stacked>
              {
                this.props.stateProps.map((x,i) => {
                  if (this.props.messages) { !x.config.valid ? messages = <p key={i}>{x.config.message}</p> : messages = <p>{null}</p> }
                    err = <p key={i}>{this.props.err}</p>

                  return (
                    <div key={i}>
                      {x.id==="floor"? <div key={i}><Address click={this.props.selectoptionfrom} placeholder={this.state.placeholder_from} ></Address> <p> {this.props.messagesAddress}</p></div>:null}
                     
                      <Form.Input
                        key={x.id}
                        placeholder={x.config.placeholder}
                        fluid icon={x.config.icon}
                        iconPosition='left'
                        type={x.config.type}
                        onChange={(event) => this.props.changed(event, x.id)}
                        value={x.config.value}
                        required={true}
                        title={x.config.title}
                      />
                      {messages}
                    </div>
                  )
                })
              }            
             
             
              {err}
              {this.props.button ? <Button
                content={open ? 'התעדכן' : 'עדכן פרטים'}
                negative={open}
                positive={!open}
                onClick={this.handleClick}
              /> : <input disabled={this.props.loading} value={this.props.value} type="submit" color='teal' size='large' />}
              <TransitionablePortal onClose={this.handleClose} open={open}>
                <Segment
                  style={{color:"red", left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                  <Header>עדכון פרטים חדשים</Header>
                  <p>!הפרטים עודכנו בהצלחה</p>
                </Segment>
              </TransitionablePortal>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid >)
  }
}
export default signupForm