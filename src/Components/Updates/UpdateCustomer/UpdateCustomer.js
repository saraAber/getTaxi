import React, { Component } from 'react';
import Update from '../../Signups/SignupCustomer/SignupForm/SignupForm';
import { updatecustomer, refreshcustomer } from '../../../store/reducer/actionUser'
import { connect } from 'react-redux';
class signinCustomer extends Component {
    state = {
        open: false,
        setOpen: true,
        optionCity: [],
        x: null,
        City: null,
        messages: false,
        messageAddress: "",
        address_from: null,
        updateUser: false,
        content:"הפרטים עודכנו בהצלחה",
        IsCorrect: false,
        customer: {
            lastName: {
                type: "text",
                placeholder: "שם משפחה",
                value: "",
                icon: "user",
                pattern: /^[\u0590-\u05FF ,.'-]+$/i,
                valid: true,
                message: "שם משפחה אינו תקין"
            },
            floor: {
                type: "number",
                placeholder: "קומה",
                value: "",
                icon: "point",
                pattern: /^/,
                valid: true
            },
            phone: {
                type: "tel",
                placeholder: "טלפון",
                value: "",
                icon: "call",
                pattern: /^\d{10}$/,
                valid: true,
                message: "מספר טלפון אינו תקין"
            },
            email: {
                type: "text",
                placeholder: `דוא"ל`,
                value: "",
                icon: "wifi",
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                valid: true,
                message: "כתובת מייל אינו תקין"
            },
            password: {
                type: "password",
                placeholder: "סיסמה",
                value: "",
                sumstring: 0,
                sumint: 0,
                icon: "lock",
                pattern: /^.{8,}/,
                valid: true,
                message: "הסיסמה חייבת להכיל לפחות 8 תווים"
            }
        }
    }

    componentWillMount() {
        this.props.refreshpage(sessionStorage.getItem("userId"))

    }
    //Checks all entered data properly
    validation = () => {
        this.setState({ validFile: false })
        for (var x in this.state.customer) {
            if (!this.state.customer[x].valid) {
                this.setState({ messages: true })
                if (this.state.address_from === null) {
                    this.setState({ messageAddress: "חייב למלא כתובת" })
                }
                return;
            }
        }
        if (this.state.address_from !== null) {

            this.setState({ messageAddress: "" }, () => {
                const data = {
                    Cust_Kod: this.props.user.Cust_Kod,
                    Cust_Floor: this.state.customer.floor.value,
                    cust_Address: this.state.address_from,
                    Cust_LastName: this.state.customer.lastName.value,
                    Cust_Password: this.state.customer.password.value,
                    Cust_PhoneNumber: this.state.customer.phone.value,
                }
                this.props.update(data)
                this.setState({ IsCorrect: true })
            })
        }
        else {

            this.setState({ messageAddress: "חייב לבחור כתובת" })
        }
    }
    //enter here after all letter and update if its correct
    inputChange = (event, id) => {
        const newform = { ...this.state.customer };
        const formChange = { ...newform[id] };
        formChange.value = event.target.value;
        if (formChange.pattern.test(String(formChange.value).toLowerCase())) {
            formChange.valid = true
        }
        else
            formChange.valid = false
        newform[id] = formChange;
        this.setState({ customer: newform });
    }
    //While clicking on update comes to this function
    submit = () => {
        this.validation()
    }
    //update the address in state
    selectoptionfrom = (event, data) => {
        this.setState({ address_from: event })
        this.setState({ messageAddress: "" })
    }
    //reset data
    componentDidUpdate() {
        if (this.state.updateUser === false) {
            let customer = this.state.customer
            const user = { ...this.props.user }
            customer.lastName.value = user.Cust_LastName
            customer.password.value = user.Cust_Password
            // customer.address_from=user.cust_Address
            customer.phone.value = user.Cust_PhoneNumber
            customer.floor.value = user.Cust_Floor
            this.setState({ customer: customer })
            this.setState({ updateUser: true })
        }
    }
    render() {
       
        const arr = [];
        for (let x in this.state.customer) {
            arr.push({ id: x, config: this.state.customer[x] })
        }
        return (
            <div>
                <Update
                    stateProps={arr}
                    changed={this.inputChange}
                    submit={this.submit}
                    optionCity={this.state.optionCity}
                    changeoption={this.selectoption}
                    messages={this.state.messages}
                    selectoptionfrom={this.selectoptionfrom}
                    messagesAddress={this.state.messageAddress}
                    err={this.props.errMas}
                    loading={this.props.loading}
                    button={true}
                    IsCorrect={this.state.IsCorrect}
                    value="עידכון פרטים"
                />
            </div>)
    }
}
const mapDispatcToProps = dispatch => {
    return {
        update: (newcustomer) => dispatch(updatecustomer(newcustomer)),
        refreshpage: (Id) => dispatch(refreshcustomer(Id))

    }
}
const mapStateToProps = state => {
    return {
        user: state.user.User,
        errMas: state.user.errorMassge,
        loading: state.user.loading,
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(signinCustomer);