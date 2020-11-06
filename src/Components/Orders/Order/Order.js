import React, { Component } from 'react'
import { Form, Grid, Header, Segment,Button } from 'semantic-ui-react';
import Address from './AddressInput';
import Drivers from './Drivers';
import '../../../css/Form.css'

class Order extends Component {
  state = {
    placeholder_to: "כתובת יעד",
    placeholder_from: "כתובת איסוף",
    addressfrom:null,
    flag:false
  }
  componentDidUpdate(){
    if(this.props.addresssource!==null&&this.state.addressfrom===null&&!this.state.flag)
    this.setState({addressfrom:this.props.addresssource,flag:true})
    
  }
  resetaddress=()=>{
    this.setState({addressfrom:null})
  }
  render() {
    const classes = [];

    return (
      <Grid textalign='center' style={{ height: '100vh' }} verticalalign='middle'>
        <Grid.Column style={{ maxWidth: "293px", top: "5vw", direction: "rtl",right:"-9vw" }}>
          <Header id="header" as='h2'  textalign='center'>
           הזמנת משלוח
       </Header>
    
          <Form size='large' className={classes.form} onSubmit={(event) => this.props.submit(event)}>
            <Segment stacked  >
            <div id="choos_size"> בחר גודל חבילה וכמות</div>
            <div id="sizes"> 
            <div className="sizes"> {this.props.s}</div>
            <div className="sizes"> {this.props.m} </div>
            <div className="sizes"> {this.props.l} </div>
            </div>
              {
                this.props.stateProps.map((x,i) => {             
                 
                  return (
                    <div key={i}  className={ ` ${x.config.className} ${!x.config.valid ? this.props.inputClass:''}`} id={x.config.id} >
              {x.id==="from_floor"? <Address from="fromPlace" reset={this.resetaddress} address={this.state.addressfrom} click={this.props.selectoptionfrom} placeholder={this.state.placeholder_from} icon="arrow left" ></Address>:
              x.id==="to_floor"?<Address from="toPlace" address={null} click={this.props.selectoptionto} placeholder={this.state.placeholder_to} icon="arrow right" ></Address>:null
              }
                      
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
             
                          
             <div id="if_sms"> ?האם לשלוח הודעה לנמען<input type="checkbox" defaultChecked={false} onChange={this.props.onchange}/></div>
             {this.props.price!== "הזמן משלוח"?<Drivers value={this.props.price}  />:<Button id="submit" content={this.props.price}  ></Button>}        
            </Segment>
          </Form>
        </Grid.Column>
      
      </Grid>
   
    )
  }
}
export default Order