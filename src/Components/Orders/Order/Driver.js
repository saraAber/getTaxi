import React, { Component } from 'react'
import { Rating, Button, Header, Segment, TransitionablePortal, Loader } from 'semantic-ui-react'
import '../../../css/Form.css'

class driver extends Component {
    state = { open: false }

    //when clicking on the request button for a driver
    handleClick = () => {
        const order = { ...this.props.order }
        this.setState((prevState) => ({ open: !prevState.open }))
        this.props.checked(this.props.driver.Dr_Id)
        this.props.orderconfirmed(order.Ord_Kod)
    }
    handleClose = () => this.setState({ open: false })

    render() {
        const { open } = this.state
        return (
            <div className="drivers">
                <div className="inside_sut_drivers"><Rating className="rating" maxRating={5} defaultRating={this.props.driver.Dr_Points} disabled /></div>
                <div  className="inside_sut_drivers" id="sut_driver_name">  {this.props.driver.Dr_FirstName + "  " + this.props.driver.Dr_LastName}</div>
                <div className="inside_sut_drivers"> יגיע בעוד {this.props.driver.DurationSource} דקות </div>
                <img className="img" src={this.props.driver.Dr_Token} id="img_driver" alt="" />
                <Button
                id="button_request"
                    content={open ? 'הבקשה נשלחה' : 'בקש הזמנה '}
                  
                    disabled={this.props.disabled}
                    onClick={this.handleClick}
                />
                <TransitionablePortal onClose={this.handleClose} open={open}>
                    <Segment
                        style={{ left: '25%', position: 'fixed', top: '44%', zIndex: 1000 }}
                    >
                        <Loader active={this.props.active} inline='centered' />
                        <i  className="check curcle outline icon"></i>
                        <Header   >{this.props.value}</Header>

                    </Segment>
                </TransitionablePortal>
            </div>
        )
    }
}
export default driver