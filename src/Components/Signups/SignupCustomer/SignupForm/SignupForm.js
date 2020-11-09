import React, { Component } from 'react'
import {  TransitionablePortal,Form, Grid, Header, Segment } from 'semantic-ui-react'
import Address from '../../../Orders/Order/AddressInput'
import '../../../../css/Form.css'

class signupForm extends Component {
  state={
    placeholder_from: "כתובת איסוף",
    open: false,
    flag: false ,
    addressfrom:null,
    flagaddress:false
  }
  //
  componentDidUpdate() {
    if (!this.state.open && this.props.IsCorrect && !this.state.flag) {

      this.setState({ open: true,flag: true })
    }
    if(this.props.address!==null&&this.state.addressfrom===null&&!this.state.flagaddress)
    this.setState({addressfrom:this.props.address,flagaddress:true})
  }
  
  resetaddress=()=>{
    this.setState({addressfrom:null})
  }

  handleClick = () => {
    if (this.props.IsCorrect)
      this.setState((prevState) => ({ open: !prevState.open }))
  }
  handleClose = () => this.setState({ open: false })


  render() {
    const { open } = this.state
    let err
    
    return (
      <Grid textalign='center' style={{ height: '100vh' }} verticalalign='middle' >
        <Grid.Column style={{ "maxWidth": "293px", top: "7vw", direction: "rtl", right: "-9vw"}}>
          <Header  id="header" as='h2'  textalign='center'>
            {this.props.value}
          </Header>
          <Form size='large' onSubmit={(event) => this.props.submit(event)}>
            <Segment stacked >
              {
                this.props.stateProps.map((x,i) => {
                    err = <p key={i}>{this.props.err}</p>
                  return (
                    <div key={i}  className={ ` ${x.config.className} ${!x.config.valid ? this.props.inputClass:''}`} id={x.config.id}>
                      {x.id==="floor"? <div key={i}><Address from="fromPlace" reset={this.resetaddress} address={this.state.addressfrom} click={this.props.selectoptionfrom} placeholder={this.state.placeholder_from} icon="map" ></Address> <p> {this.props.messagesAddress}</p></div>:null}
                      <Form.Input
                        key={x.id}
                        placeholder={x.config.placeholder}
                        fluid icon={x.config.icon}
                        type={x.config.type}
                        onChange={(event) => this.props.changed(event, x.id)}
                        value={x.config.value}
                        required={true}
                        valid={x.config.valid.toString()}
                        title={x.config.title}
                        />
                    </div>
                  )
                })
              }            
             
         
              {err}
              {this.props.button ? <input className="seven wide column " id="submit"  type="submit"
                onClick={this.handleClick}
                value={open ? 'התעדכן' :'עדכן פרטים'}
              /> : <input className="seven wide column " id="submit"  disabled={this.props.loading} value={this.props.value} type="submit" color='red' size='large' />}
              <TransitionablePortal onClose={this.handleClose} open={open}>
                <Segment
                  style={{color:"red",left: '24vw', position: 'absolute', top: '50%', zIndex: 1000 }}>
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