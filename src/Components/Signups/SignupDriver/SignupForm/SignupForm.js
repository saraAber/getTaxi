import React, { Component } from 'react'
import {  Form, Grid, Header,  Segment} from 'semantic-ui-react'
import { Dropdown ,Button,TransitionablePortal} from 'semantic-ui-react'
import Image from '../../../Image'
import './SignupForm.css'

class signinForm extends Component {
  state = { open: false, flag: false }

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
    let message
    let err
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450, top: "-3vw"  }}>
          <Header as='h2' color='teal' textAlign='center'>
            {this.props.value}
          </Header>
          <Form size='large' onSubmit={(event) => this.props.submit(event)}>
            <Segment stacked className="grid">
              {
                this.props.stateProps.map((x, i) => {
                  if (this.props.messages) { !x.config.valid ? message = <p key={i}>{x.config.message}</p> : message = <p>{null}</p> }
                  if (this.props.err !== "")
                    err = <p key={i}>{this.props.error}</p>
                  return (
                    <div key={i} className={x.config.className}>
                      <Form.Input
                        key={x.id}
                        placeholder={x.config.placeholder}
                        fluid icon={x.config.icon}
                        iconPosition='right'
                        type={x.config.type}
                        onChange={(event) => this.props.changed(event, x.id)}
                        value={x.config.value}
                        required={true}
                        title={x.config.title}
                      />
                      {message}
                    </div>
                  )
                })
              }
              <Dropdown
                className="seven wide column drop"
                placeholder='בחר כלי רכב'
                fluid
                search
                options={this.props.optionCars}
                selection
                required
                onChange={this.props.changeoption}
              />
              <p> {this.props.messageCar} </p>
              {err}
              <Image src={this.props.srcimage}></Image> 
              {this.props.button ? <Button
                content={open ? 'התעדכן' : 'עדכן פרטים'}
                negative={open}
                positive={!open}
                onClick={this.handleClick}
              /> : <input className="seven wide column submit" disabled={this.props.loading} value={this.props.value} type="submit" color='teal' size='large' />}
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
      </Grid>
    )
  }
}
export default signinForm