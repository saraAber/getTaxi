import React, { Component } from 'react'
import { Form, Grid, Header, Segment,Button } from 'semantic-ui-react';
import Address from './AddressInput';
import Drivers from './Drivers';
class Order extends Component {
  state = {
    placeholder_to: "כתובת יעד",
    placeholder_from: "כתובת איסוף",
  }
  render() {
    const classes = [];
    let y;
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
           הזמנה
       </Header>
          <Form size='large' className={classes.form} onSubmit={(event) => this.props.submit(event)}>
            <Segment stacked>
              {
                this.props.stateProps.map((x,i) => {             
                  if (this.props.messages) { !x.config.valid ? y = <p key={i}>{x.config.message}</p> : y = <p>{null}</p> }
                  return (
                    <div key={i}>
              {x.id==="from_floor"? <Address click={this.props.selectoptionfrom} placeholder={this.state.placeholder_from} ></Address>:
              x.id==="to_floor"?<Address click={this.props.selectoptionto} placeholder={this.state.placeholder_to} ></Address>:null}
                      <Form.Input
                        key={x.id}
                        fluid icon={x.config.icon}
                        iconPosition='left'
                        placeholder={x.config.placeholder}
                        type={x.config.type}
                        onChange={(event) => this.props.changed(event, x.id)}
                        value={x.config.value}
                        required={true}
                        title={x.config.title}
                        min={x.config.min}
                      />
                      {y}
                    </div>
                  )
                })
              }         
             
                          
             <div> ?האם לשלוח הודעה לנמען<input type="checkbox" defaultChecked={false} onChange={this.props.onchange}/></div>
             {this.props.price!== "הזמן משלוח"?<Drivers value={this.props.price} />:<Button content={this.props.price} />}        
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}
export default Order