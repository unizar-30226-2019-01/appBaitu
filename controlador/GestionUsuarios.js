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


export const login = user => {
  return axios
    .post('http://52.151.88.18:5000/login', {
      login: user.login,
      password: user.password
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log("error")
    })
}

export const actualizarInfo = user => {
  axios
      .post(`http://52.151.88.18:5000/updateUsuario`, {
          login: user.login,
          nombre: user.nombre,
          apellidos: user.apellidos,
          telefono: user.telefono,
          email: user.email,
          foto: user.foto
      })
     .then(response => {
        console.log("vuelve al controlador")
        _storeData = async () => {
            try {
                await AsyncStorage.setItem('userToken', response.data)
            } catch (error) {
                console.log("Error en el setItem(nuevoToken)")
            }
        };
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
