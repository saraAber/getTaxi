import React, { Component } from 'react';
import Order from './Order/Order';
import { connect } from 'react-redux';
import { orderfunc, calculateprice } from '../../store/reducer/actionOrder'
import { refreshcustomer } from '../../store/reducer/actionUser'
import axios from 'axios'

class Orders extends Component {
    state = {
        address_to: null,
        address_from: null,
        // show: true,
        // Size: null,
        sms: false,
        messages: false,
        price: "הזמן משלוח",
        orders: {

            to_first_name: {
                value: "",
                icon: "user",
                placeholder: "שם פרטי",
                type: "text",
                pattern: /^[\u0590-\u05FF ,.'-]+$/i,
                valid: false,
                message: "שם פרטי אינו תקין"
            },
            to_last_name: {
                value: "",
                icon: "user",
                placeholder: "שם משפחה",
                type: "text",
                pattern: /^[\u0590-\u05FF ,.'-]+$/i,
                valid: false,
                message: "שם משפחה אינו תקין"
            },
            to_phone_number: {
                value: "",
                icon: "phone",
                placeholder: "מספר טלפון",
                type: "tel",
                pattern: /^\d{10}$/,
                message: "מספר טלפון אינו תקין",
                valid: false
            },
            from_floor: {
                value: "",
                placeholder: "קומה",
                type: "number",
                pattern: /^/,
                valid: false,
            },
            to_floor: {
                value: "",
                placeholder: "קומה",
                type: "number",
                pattern: /^/,
                valid: false,
            },
            Qty_S: {
                value: "",
                placeholder: "S",
                type: "number",
                pattern: /^/,
                valid: false,
            },
            Qty_M: {
                value: "",
                placeholder: "M",
                type: "number",
                pattern: /^/,
                valid: false,
            },
            Qty_L: {
                value: "",
                placeholder: "L",
                type: "number",
                pattern: /^/,
                valid: false,
            },
        }
    }

    UNSAFE_componentWillMount() {
        this.props.refreshpage(sessionStorage.getItem("userId"))
        axios.get('http://localhost:50130/api/Packages').then(x => {
            const data1 = { ...x.data }
            const option1 = []
            for (let x in data1) {

                option1.push({ key: data1[x].Pac_Kodtype, text: data1[x].Pac_Nametype, value: data1[x].Pac_Kodtype })
            }
            this.setState({ optionSize: option1 })
        }).catch(x => {
            alert("not good")
        })

    }
    selectoptionto = (event, data) => {
        this.setState({ address_to: event }, () => this.validation())
    }
    selectoptionfrom = (event, data) => {
        this.setState({ address_from: event }, () => this.validation())
    }


    // selectoptionsize = (event, data) => {
    //     this.setState({ Size: data.value,SizeKey: data.key })
    // }
    validation = () => {
        for (var x in this.state.orders) {
            if (!this.state.orders[x].valid) {
                // this.setState({ messages: true })
                // if (this.state.CarType === null)
                //   this.setState({ messageCarType: "חייב לבחור כלי רכב" })
                return;
            }
        }
        if (this.state.address_from !== null && this.state.address_to !== null) {
            this.calculateprice()

        }
    }

    inputChange = (event, id) => {
        const newform = { ...this.state.orders };
        const formChange = { ...newform[id] };
        formChange.value = event.target.value;

        if (formChange.pattern.test(String(formChange.value).toLowerCase())) {
            formChange.valid = true
        }
        else {
            this.setState({ price: "הזמן משלוח" })
            formChange.valid = false
        }

        newform[id] = formChange;
        this.setState({ orders: newform }, () => this.validation());

    }

    calculateprice = () => {
        const data = {
            Ord_Kod: null,
            Ord_Id_driver: null,
            Ord_Stattus: 0,
            IsMessage: this.state.sms,
            Cust_send: sessionStorage.getItem("userId"),
            Cust_sourceAddress: this.state.address_from,
            Cust_DesAddress: this.state.address_to,
            Cust_getfloor: this.state.orders.to_floor.value,
            Cust_getName: this.state.orders.to_first_name.value + " ," + this.state.orders.to_last_name.value,
            Cust_getPhone: this.state.orders.to_phone_number.value,
            packages: [{
                PTO_Kod: null,
                PTO_Kod_order: null,
                PTO_Kod_PackageType: 1,
                PTO_qty: this.state.orders.Qty_S.value
            }, {
                PTO_Kod: null,
                PTO_Kod_order: null,
                PTO_Kod_PackageType: 2,
                PTO_qty: this.state.orders.Qty_M.value
            }, {
                PTO_Kod: null,
                PTO_Kod_order: null,
                PTO_Kod_PackageType: 4,
                PTO_qty: this.state.orders.Qty_L.value
            }]
        }

        this.props.calculate(data)

    }

    submit = () => {
        if (this.state.price !== "הזמן משלוח") {
            const order = { ...this.props.order }
            order.IsMessage = this.state.sms
            this.props.orders(order)
        }
        else
            this.setState({ messages: true })
    }
    componentDidUpdate() {
        if (this.props.order != null) {
            if (this.state.price === "הזמן משלוח") {
                const x = { ...this.props.order }
                this.setState({ price: " הזמן משלוח ב " + x.Ord_Price + " שקל" })
            }

        }

    }
    render() {


        const arr = [];
        for (let x in this.state.orders) {
            arr.push({ id: x, config: this.state.orders[x] })
        }
        return (
            <div>
                <Order
                    stateProps={arr}
                    changed={this.inputChange}
                    qty_change={this.qty_change}
                    submit={this.submit}
                    linked={this.changehandler}
                    messages={this.state.messages}
                    price={this.state.price}
                    selectoptionto={this.selectoptionto}
                    selectoptionfrom={this.selectoptionfrom}
                    onchange={() => {
                        this.setState({ sms: !this.state.sms })
                    }}
                ></Order>
            </div>

        );
    }

}
const mapDispatcToProps = dispatch => {
    return {
        calculate: (Order) => dispatch(calculateprice(Order)),
        orders: (order) => dispatch(orderfunc(order)),
        refreshpage: (Id) => dispatch(refreshcustomer(Id))
    }
}
const mapStateToProps = state => {
    return {
        // order: state.order,
        loading: state.order.loading,
        errMas: state.order.errorMassge,
        order: state.order.order,
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(Orders);

