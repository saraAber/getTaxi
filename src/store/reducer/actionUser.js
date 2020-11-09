import axios from 'axios'
import { login, userpath, loading, error_message, logout } from '../action'

export const signupcustomer = (customer) => {
    return dispatch => {
        dispatch({ type: loading })
        axios.post('http://localhost:50130/api/customer', customer).then(x => {

            const Customer = { ...x.data }
            localStorage.setItem("UserType", "customer")
            sessionStorage.setItem('userId', Customer.Cust_Kod)
            dispatch({ type: login, user: Customer })

        })
            .catch(err => {
                console.dir(err)
                if (err.message === "Network Error") {
                    dispatch({ type: error_message, value: "בעיה במערכת, נסה מועד מאוחר יותר" })
                }
                if (err.response) {
                    dispatch({ type: error_message, value: err.response.data.Message })
                }
            })
    }
}

export const signupdriver = (driver) => {
    return dispatch => {
        dispatch({ type: loading })
        axios.post('http://localhost:50130/api/driver', driver).then(x => {
            const Driver = { ...x.data }
            localStorage.setItem("UserType", "driver")
            sessionStorage.setItem('userId', Driver.Dr_Id)
            dispatch({ type: login, user: Driver })

        }).catch(err => {
                console.dir(err)
                if (err.message === "Network Error") {
                    dispatch({ type: error_message, value: "בעיה במערכת, נסה מועד מאוחר יותר" })
                }
                if (err.response) {
                    dispatch({ type: error_message, value: err.response.data.Message })
                }
            })
    }
}

export const loginuser = (password, name, type) => {
    return dispatch => {
        dispatch({ type: loading })
        if (type === "/customer") {
            axios.get(`http://localhost:50130/api/customer?Password=${password}&Email=${name}`).then(x => {
                const Customer = { ...x.data }
                sessionStorage.setItem('userId', Customer.Cust_Kod)
                localStorage.setItem("UserType", "customer")
                dispatch({ type: login, user: Customer })
            })
                .catch(err => {
                    if (err.message === "Network Error") {
                        dispatch({ type: error_message, value: "בעיה במערכת, נסה מועד מאוחר יותר" })
                    }
                    if (err.response) {
                        dispatch({ type: error_message, value: err.response.data.Message })
                    }
                })
        }
        else {
            axios.get(`http://localhost:50130/api/driver?Password=${password}&Email=${name}`).then(x => {
                const Driver = { ...x.data }

                sessionStorage.setItem('userId', Driver.Dr_Id)
                localStorage.setItem("UserType", "driver")
                dispatch({ type: login, user: Driver })
            })
                .catch(err => {                  
                    if (err.message === "Network Error") {
                        dispatch({ type: error_message, value: "בעיה במערכת, נסה מועד מאוחר יותר" })
                    }
                    if (err.response) {
                        dispatch({ type: error_message, value: err.response.data.Message })
                    }
                })
        }

    }
}
//update type user path
export const pathuser = (user) => {
    return dispatch => {
        dispatch({ type: userpath, userpath: user })
    }
}
export const updatedriver = (newdriver) => {
    return dispatch => {
        dispatch({ type: loading })
        axios.put('http://localhost:50130/api/driver', newdriver).then(x => {
            const Driver = { ...x.data }
            dispatch({ type: login, user: Driver })
        }).catch(err => {
            if (err.message === "Network Error") {
                dispatch({ type: error_message, value: "בעיה במערכת, נסה מועד מאוחר יותר" })
            }
            if (err.response) {
                dispatch({ type: error_message, value: err.response.data.Message })
            }
        })
    }
}
export const updatecustomer = (customer) => {
    return dispatch => {
        dispatch({ type: loading })
        axios.put('http://localhost:50130/api/customer', customer).then(x => {
            const Customer = { ...x.data }
            dispatch({ type: login, user: Customer })
        }).catch(err => {
            if (err.message === "Network Error") {
                dispatch({ type: error_message, value: "בעיה במערכת, נסה מועד מאוחר יותר" })
            }
            if (err.response) {
                dispatch({ type: error_message, value: err.response.data.Message })
            }
        })
    }
}
export const updatestatus = (driver) => {
    return dispatch => {
        axios.put(`http://localhost:50130/api/driver?Id=${driver.Dr_Id}`).then(x => {
            const Driver = { ...x.data }
            dispatch({ type: login, user: Driver })
        }).catch(x => {
            alert("not good")
        })
    }
}
export const leave = () => {
    return dispatch => {
        sessionStorage.removeItem('userId');
        localStorage.removeItem('UserType')
        dispatch({ type: logout })
    }
}

export const refreshcustomer = (Id) => {
    return dispatch => {
        axios.get(`http://localhost:50130/api/customer?Id=${Id}`).then(x => {
            const Customer = { ...x.data }
            dispatch({ type: login, user: Customer })
        })
    }
}

export const refreshdriver = (Id) => {
    return dispatch => {
        axios.get(`http://localhost:50130/api/driver?Id=${Id}`).then(x => {
            const Driver = { ...x.data }
            dispatch({ type: login, user: Driver })
        })
    }
}
//update busy driver     

export const ChangeBusyDriver = () => {
    return dispatch => {
         axios.put(`http://localhost:50130/api/putbusydriver?kodDriver=${sessionStorage.getItem("userId")}`).then(x => {
            const driver= {...x.data}
            dispatch({ type: login, user: driver })
            
        }).catch(err => {
        if (err.message === "Network Error") {
        throw new Error("בעיה במערכת, נסה מועד מאוחר יותר");
         }
        if (err.response) {
        throw new Error( err.response.data.Message);
        }})
    }
  }