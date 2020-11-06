import React, { Component } from 'react'
import {  TransitionablePortal, Dropdown, Form, Grid, Header, Segment } from 'semantic-ui-react'
import Image from '../../../../Image'
import '../../../../css/Form.css'
class signinForm extends Component {
  state = { open: false, flag: false,src:null }

  handleClick = () => {
    if (this.props.IsCorrect)
      this.setState((prevState) => ({ open: !prevState.open }))
  }
  handleClose = () => this.setState({ open: false })
  componentDidUpdate() {
    if (!this.state.open && this.props.IsCorrect && !this.state.flag) {
      this.setState({ open: true, flag: true })
    }
  }
   
  render() {

    const { open } = this.state
    let err
    return (


      <Grid style={{ height: '100vh', "textAlign": 'center' }} verticalalign='middle'>
        <Grid.Column style={{ maxWidth: "293px", top: "7vw", direction: "rtl", right: "-9vw" }}>
          <Header as='h2' id="header" textalign='center'>
            {this.props.value}
          </Header>
          <Form size='large' onSubmit={(event) => this.props.submit(event)}>
            <Segment stacked >
              {
                this.props.stateProps.map((x, i) => {
                  if (this.props.err !== "")
                    err = <p key={i}>{this.props.error}</p>
                 
                  return (
                    <div key={i} className={ ` ${x.config.className} ${!x.config.valid ? this.props.inputClass:''}`}>
                      <Form.Input
                        key={x.id}
                        placeholder={x.config.placeholder}
                        fluid icon={x.config.icon}
                        type={x.config.type}
                        onChange={(event) => this.props.changed(event, x.id)}
                        value={x.config.value}
                        required={true}
                        title={x.config.title}
                      />
                    </div>
                  )
                })
              }
              <Dropdown
                className="seven wide column drop"
                id="cartype"
                placeholder='בחר כלי רכב'
                fluid
                search
                options={this.props.optionCars}
                selection
                required
                onChange={this.props.changeoption}
              />
              {err}
              <Image isShowpicture={this.props.Showpicture} srcimage={this.props.srcimage}></Image>
              

              {this.props.button ? <input id="submit" type="submit"

                onClick={this.handleClick}
                value={open ? 'התעדכן' :'עדכן פרטים'}
              /> : <input className="seven wide column " id="submit" disabled={this.props.loading} value={this.props.value} type="submit" color='teal' size='large' />}
              
              <TransitionablePortal onClose={this.handleClose} open={open}>
           

                <Segment
                  style={{ color: "red", left: '24vw', position: 'absolute', top: '50%', zIndex: 1000 }}>
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