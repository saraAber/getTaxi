import axios from 'axios'



//return list of cars type
export function GetCarsType() {
  return axios.get('http://localhost:50130/api/Cars').then(x => {
    const data = { ...x.data }
    const option = []
    for (let x in data) {
      option.push({ key: data[x].Car_Kodtype, text: data[x].Car_Nametype, value: data[x].Car_Kodtype })
    }
    return option;
  }).catch(err => {
    if (err.message === "Network Error") {
      throw new Error( "בעיה במערכת, נסה מועד מאוחר יותר");
    }
    if (err.response) {
      throw new Error(err.response.data.Message);
    }
  })

}


//update duration of destination in order
export function UpdateDurationOrder(id) {
 
  return axios.put(`http://localhost:50130/api/PutUpdateDurationOrder?DriverId=${sessionStorage.getItem("userId")}`).then(x => {
 
}).catch(err => {
    if (err.message === "Network Error") {
      throw new Error("בעיה במערכת, נסה מועד מאוחר יותר");
    }
    if (err.response) {
      throw new Error( err.response.data.Message);
    }
  })
}

//Returns all orders placed by the customer
export function AllOrders() {
  return axios.get(`http://localhost:50130/api/order?Id=${sessionStorage.getItem('userId')}`).then(x => {
    const data = { ...x.data }
    let neworders = []
    let orders = []
    for (let x in data) {
      neworders.push(data[x])
    }
    while (neworders.length !== 0) {
      orders.push(neworders.pop())
    }
    return orders;
  }).catch(err => {
    if (err.message === "Network Error") {
      throw new Error( "בעיה במערכת, נסה מועד מאוחר יותר");
    }
    if (err.response) {
      throw new Error( err.response.data.Message);
    }
  })
}



//Updates the driver's rating by a customer to order
export const driversrating = (Ord_Kod, rating) => {
  return axios.put(`http://localhost:50130/api/UpdateRating?IdOrder=${Ord_Kod}&num=${rating}`).then(x => {
    return
  }).catch(err => {
    if (err.message === "Network Error") {
      throw new Error( "בעיה במערכת, נסה מועד מאוחר יותר");
    }
    if (err.response) {
      throw new Error( err.response.data.Message);
    }
  })

}

//Returns driver for each order and update the state
export function DriverOrder(Ord_Id_driver) {
  return axios.get(`http://localhost:50130/api/driver?Id=${Ord_Id_driver}`).then(x => {
    const data = { ...x.data }
    return data;
  })
}

//Returns customer for each order and update the state
export function CustomerOrder(Cust_send) {
  return axios.get(`http://localhost:50130/api/customer?Id=${Cust_send}`).then(x => {
    const data = { ...x.data }
    return data;
  })
}



//update status of order
export const StatusOrder = (order) => {
  return axios.put('http://localhost:50130/api/order', order).then(x => {
    const data = { ...x.data }
    return data;
  }).catch(err => {
    if (err.message === "Network Error") {
      throw new Error("בעיה במערכת, נסה מועד מאוחר יותר");
    }
    if (err.response) {
      throw new Error(err.response.data.Message);
    }
  })
}


//Returns all orders placed by driver
export function AllOrdersByDrivers() {
  return axios.get(`http://localhost:50130/api/DriverToOrder?IdDriver=${sessionStorage.getItem("userId")}`).then(x => {
    const data = { ...x.data }
    let neworders = []
    let orders = []
    for (let x in data) {
      neworders.push(data[x])
    }
    while (neworders.length !== 0) {
      orders.push(neworders.pop())
    }
    return orders
  }).catch(err => {
    if (err.message === "Network Error") {
      throw new Error( "בעיה במערכת, נסה מועד מאוחר יותר");
    }
    if (err.response) {
      throw new Error( err.response.data.Message);
    }
  })
}


