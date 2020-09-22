import React, { Component } from 'react'
import { Rating, Button, Header, Segment, TransitionablePortal, Loader } from 'semantic-ui-react'

class driver extends Component {
    state = { open: false }

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
            <div>
                <div><Rating maxRating={5} defaultRating={this.props.driver.Dr_Points} disabled />:דירוג נהג</div>
                <div> : שם נהג {this.props.driver.Dr_FirstName + "  " + this.props.driver.Dr_LastName}</div>
                <div> בעוד {this.props.driver.DurationSource} דקות </div>
                <Button
                    content={open ? 'הבקשה נשלחה' : ' בקשת הזמנה מנהג זה '}
                    negative={open}
                    positive={!open}
                    disabled={this.props.disabled}
                    onClick={this.handleClick}
                />
                <TransitionablePortal onClose={this.handleClose} open={open}>
                    <Segment
                        style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}
                    >
                        <Loader active={this.props.active} inline='centered' />
                        <Header>{this.props.value}</Header>

                    </Segment>
                </TransitionablePortal>
            </div>
        )
    }
}
export default driver