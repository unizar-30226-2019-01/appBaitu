import axios from 'axios'
import AsyncStorage from 'react-native'

export const register = newUser => {
  return axios.post('http://52.151.88.18:5000/register', {
      login: newUser.login,
      password: newUser.password,
      nombre: newUser.nombre,
      apellidos: newUser.apellidos,
      email: newUser.email,
      foto: newUser.foto,
      telefono: newUser.telefono
    })
    .then(response => {
      console.log("sale: "+response.data)
      console.log("sale2: "+response.data)
      return response.data
    })
    .catch(err => {
      console.log("errorrrrrrrrrrrrrrr")
      return "error"
    })
}

export const registerCheck = newUser => {
  return axios.post('http://52.151.88.18:5000/registerCheck', {
      login: newUser.login,
      password: newUser.password,
      nombre: newUser.nombre,
      apellidos: newUser.apellidos,
      email: newUser.email,
      foto: newUser.foto,
      telefono: newUser.telefono
    })
    .then(response => {
      console.log("Data: "+response.data)
      AsyncStorage.setItem('userToken', response.data)
      console.log("Data: "+response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      return "error"
    })
}

export const loginCheck = user => {
  return axios
    .post('http://52.151.88.18:5000/loginCheck', {
      login: user.login,
      password: user.password
    }).then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log("error")
    })
}

export const login = user => {
  return axios
    .post('http://52.151.88.18:5000/login', {
      login: user.login,
      password: user.password
    })
    .then(response => {
      //localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log("error")
    })
}

export const actualizarInfo = user => {
  axios
      .post(`updateUsuario`, {
        login: user.login,
        nombre: user.nombre,
        apellidos: user.apellidos,
        telefono: user.telefono,
        email: user.email,
        biografia: user.biografia
      })
      .then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
}

export const deleteUser = user => {
  axios
    .post(`http://52.151.88.18:5000/delete`, {
      login: user.login,
  })
    .then((res) => {
      console.log(res)
  })
    .catch(err => {
      console.log(err)
  })
}

export const infoUsuario = login => {
  return axios
      .get(`http://52.151.88.18:5000/infoUsuario/${login}`, {

      })
      .then(res => {
        var data = []
        data[0]=res.data.Login
        data[1]=res.data.Nombre
        data[2]=res.data.Apellidos
        data[3]=res.data.Email
        data[4]=res.data.Foto
        data[5]=res.data.Password
        data[6]=res.data.Puntuacion
        data[7]=res.data.Telefono
        return data
    })
}
