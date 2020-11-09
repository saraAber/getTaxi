import React, { Component } from 'react';
import Order from './Order/Order';
import { connect } from 'react-redux';
import { orderfunc, calculateprice } from '../../store/reducer/actionOrder'
import { refreshcustomer } from '../../store/reducer/actionUser'
import axios from 'axios'
import '../../css/Form.css'

class Orders extends Component {
    state = {
        optionSizeS: "",
        optionSizeM: "",
        optionSizeL: "",
        address_to: null,
        address_from: null,
        sms: false,
        inputClass: "",
        price: "הזמן משלוח",
        orders: {
            Qty_S: {
                value: "",
                placeholder: "S",
                type: "number",
                pattern: /^/,
                valid: false,
                className: " qty size ",
            },
            Qty_M: {
                value: "",
                placeholder: "M",
                type: "number",
                pattern: /^/,
                valid: false,
                className: " qty"

            },
            Qty_L: {
                value: "",
                placeholder: "L",
                type: "number",
                pattern: /^/,
                valid: false,
                className: " qty"

            },

            to_first_name: {
                value: "",
                icon: "user",
                placeholder: "למי תרצה לשלוח?",
                type: "text",
                pattern: /^[\u0590-\u05FF ,.'-]+$/i,
                valid: false,
                message: "נא הכנס שם בעברית בלבד",


            },
           
            to_phone_number: {
                value: "",
                icon: "phone",
                placeholder: "מספר טלפון",
                type: "tel",
                pattern: /^\d{10}$/,
                message: "מספר טלפון אינו תקין",
                valid: false,


            },
            email: {
                type: "text",
                placeholder: `דוא"ל`,
                value: "",
                icon: "at",
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                valid: false,
                message: "כתובת מייל אינו תקין",


            },
            from_floor: {
                value: "",
                placeholder: "ק'",
                type: "number",
                pattern: /^/,
                valid: false,
                className: "five wide column ",
                id: "floor"
            },
            to_floor: {
                value: "",
                placeholder: "ק'",
                type: "number",
                pattern: /^/,
                valid: false,
                className: "five wide column ",
                id: "floor"
            },

        }
    }

    UNSAFE_componentWillMount() {
        this.props.refreshpage(sessionStorage.getItem("userId"))
        //return all  packacages sizes 
        axios.get('http://localhost:50130/api/Packages').then(x => {
            const data1 = { ...x.data }
            const option1 = []
            for (let x in data1) {

                option1.push({ key: data1[x].Pac_Kodtype, text: data1[x].Pac_Length + " *" + data1[x].Pac_Width + " *" + data1[x].Pac_Height, value: data1[x].Pac_Nametype })
            }
            this.setState({ optionSizeS: option1[0].text })
            this.setState({ optionSizeM: option1[1].text })
            this.setState({ optionSizeL: option1[2].text })
        }).catch(x => {
            alert("not good")
        })


    }
     //initial the address in the state
    selectoptionto = (event, data) => {
        this.setState({ address_to: event }, () => this.validation())
    }
    selectoptionfrom = (event, data) => {
        this.setState({ address_from: event }, () => this.validation())
    }

  //Checks all entered data properly
    validation = () => {
        for (var x in this.state.orders) {
            if (!this.state.orders[x].valid) {
                return;
            }
        }
        if (this.state.address_from !== null && this.state.address_to !== null) {
            this.calculateprice()
        }
    }

  //enter here after all letter
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

//calculate order price
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
            Cust_getName: this.state.orders.to_first_name.value,
            Cust_getPhone: this.state.orders.to_phone_number.value,
            Cust_getEmail: this.state.orders.email.value,
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

    //While clicking on order enter  this function
    submit = () => {

        if (this.state.price !== "הזמן משלוח") {
            const order = { ...this.props.order }
            order.IsMessage = this.state.sms
            this.props.orders(order)
        }
        else {
            this.validation()
            this.setState({
                inputClass: "invalid"
            })
        }
    }

    //change the text button  to price order
    componentDidUpdate() {
        if (this.props.order != null) {
            if (this.state.price === "הזמן משלוח") {
                const x = { ...this.props.order }
                this.setState({ price: " הזמן משלוח ב " + x.Ord_Price + " שקל" })
            }

        }

        if (this.props.customer && this.state.address_from === null) {
            //reset the address and the floor
            const address = this.props.customer.Cust_Address
            const order = this.state.orders
            order.from_floor.value = this.props.customer.Cust_Floor
            order.from_floor.valid = true;
            this.setState({orders:order, address_from: address })

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
                    price={this.state.price}
                    selectoptionto={this.selectoptionto}
                    selectoptionfrom={this.selectoptionfrom}
                    addresssource={this.state.address_from}
                    onchange={() => {
                        this.setState({ sms: !this.state.sms })
                    }}
                    inputClass={this.state.inputClass}
                    s={this.state.optionSizeS}
                    m={this.state.optionSizeM}
                    l={this.state.optionSizeL}
                ></Order>
            </div>

        );
    }

}
const mapDispatcToProps = dispatch => {
    return {
        calculate: (Order) => dispatch(calculateprice(Order)),
        orders: (order) => dispatch(orderfunc(order)),
        refreshpage: (Id) => dispatch(refreshcustomer(Id)),

    }
}
const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        errMas: state.order.errorMassge,
        order: state.order.order,
        customer: state.user.User
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(Orders);

