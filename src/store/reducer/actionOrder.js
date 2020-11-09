import axios from 'axios'

import { order, listdrivers, updateorder, loading, error_message, orderpath,src } from '../action'


export const orderfunc = (order) => {

    return dispatch => {
        dispatch({ type: loading })
        axios.post('http://localhost:50130/api/PostOrder', order)
            .then(x => {
                const Order = { ...x.data }
                dispatch({ type: updateorder, Neworder: Order })
                axios.post('http://localhost:50130/api/PostDrivers', Order).then(x => {
                    const drivers = { ...x.data }
                    dispatch({ type: listdrivers, Drivers: drivers })
                }).catch(err => {
                    if (err.message === "Network Error") {
                        dispatch({ type: error_message, value: "בעיה במערכת, נסה מועד מאוחר יותר" })
                    }
                    if (err.response) {
                        dispatch({ type: error_message, value: err.response.data.Message })
                    }
                })
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
export const calculateprice = (Order) => {
    return dispatch => {
        axios.post('http://localhost:50130/api/Calculatingprice', Order).then(x => {
            const NewOrder = { ...x.data }
            dispatch({ type: order, Neworder: NewOrder })

        }).catch(error => {

        })
    }
}

//update type user path
export const pathorder = (order) => {
    return dispatch => {
        dispatch({ type: orderpath, orderpath: order })
    }
}
//update src image
export const src_image = (srcfile) => {

    return dispatch => {
        dispatch({ type: src , src: srcfile})
    }
}

//Checks if the order has been confirmed
export const OrderConfirmed = (Ord_Kod) => {
    return dispatch => {
      axios.get(`http://localhost:50130/api/IsOrderConfirmed?KodOrder=${Ord_Kod}`).then(x => {
        const order = { ...x.data }
        if (order.DTO_Stattus === 1||order.DTO_Stattus === 0)
          dispatch({ type: error_message, value: "ממתין לאישור נהג" })
        else {
          dispatch({ type: error_message, value: "ההזמנה אושרה" })
        }
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
  