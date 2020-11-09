import { Button, Confirm } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { orderfunc } from '../../../store/reducer/actionOrder'
import { refreshcustomer } from '../../../store/reducer/actionUser'
import Driver from './Driver'
import axios from 'axios'
import { OrderConfirmed } from '../../../store/reducer/actionOrder'
import React, { Component } from 'react'
import { error_message } from '../../../store/action'
import '../../../css/Form.css'
class ModalExampleTopAligned extends Component {

    state = {
        open: false,
        setOpen: false,
        SelectedDriver: null,
        loading: "ממתין לאישור נהג",
        disabled: false,
        inteval: false
    }

    //initial the status of driver to 1 - order request
    checked = (Id) => {
        const Order = { ...this.props.order };
        axios.put(`http://localhost:50130/api/DriverToOrder?IdDriver=${Id}&IdOrder=${Order.Ord_Kod}`).then(x => {
        })
    }


    show = () => this.setState({ open: true })
    handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false }, window.location.reload()
    )

    //check every second if the order is confirmed
    IsOrderConfirmed = () => {
        this.setState({ disabled: true })
        const order = { ...this.props.order }
        this.setState({
            inteval: setInterval(x => {
                this.props.orderconfirmed(order.Ord_Kod)
            }, 10000)
        })

    }
    //stop checking the status order by clear interval
    componentDidUpdate() {
        if (this.props.errMas !== "" && this.state.loading !== this.props.errMas) {
            this.setState({ loading: this.props.errMas })
            if (this.props.errMas !== "ממתין לאישור נהג")
                clearInterval(this.state.inteval)
        }
    }
    render() {

        var driver = <div className="ui segment">
            <div className="ui active inverted dimmer">
                <div className="ui text loader">...מחפש נהגים זמינים</div>
            </div>

            <p></p>
        </div>;
        var Drivers = [];
        //if there are drivers then create an instance of driver
        if (this.props.allDrivers.length !== 0) {

            for (let item in this.props.allDrivers) {
                Drivers.push({ id: item, config: this.props.allDrivers[item] })
            }

            driver = Drivers.map(x => <Driver key={x.id} driver={x.config} disabled={this.state.disabled} checked={this.checked} active={this.props.errMas === "ההזמנה אושרה" ? false : true} value={this.state.loading} orderconfirmed={this.IsOrderConfirmed} />)

        }
        else {
            if (this.props.errMas === "לא נמצאו נהגים מתאימים")
                driver = this.props.errMas



        }




        return (
            <div>
                <Button id="submit" onClick={this.show}>{this.props.value} </Button>
                <Confirm id="open_window_driver"
                    open={this.state.open}
                    content={driver}
                    header="בחר נהג"
                    cancelButton={false}
                    confirmButton={false}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allDrivers: state.order.Drivers,
        order: state.order.order,
        errMas: state.user.errorMassge
    }
}
const mapDispatcToProps = dispatch => {
    return {
        orders: (order) => dispatch(orderfunc(order)),
        refreshpage: (Id) => dispatch(refreshcustomer(Id)),
        orderconfirmed: (Id) => dispatch(OrderConfirmed(Id)),
        error: (err) => dispatch({ type: error_message, value: err }),
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(ModalExampleTopAligned)