import axios from 'axios'

export const anadirProducto = newProducto => {
  return axios.post('http://52.151.88.18:5000/crearVenta', {
      headers: { "Content-type": "application/json" },
      nombre: newProducto.nombre,
      fecha: newProducto.fecha,
      categoria: newProducto.categoria,
      descripcion: newProducto.descripcion,
      precio: newProducto.precio,
      vendedor: newProducto.vendedor,
      fotoPrincipal: newProducto.fotoPrincipal,
      foto1: newProducto.foto1,
      foto2: newProducto.foto2,
      foto3: newProducto.foto3,
      provincia: newProducto.provincia
    })
    .then(res => {
        console.log("Respuesta pyhon bien")
        return res.data
    }).catch(err => {
      console.log("Respuesta pyhon mal")
      console.log(err)
      return err})
}

export const anadirSubasta = newProductoSubasta => {
  return axios.post('http://52.151.88.18:5000/crearSubasta', {
      nombre: newProductoSubasta.nombre,
      fecha: newProductoSubasta.fecha,
      categoria: newProductoSubasta.categoria,
      descripcion: newProductoSubasta.descripcion,
      fotoPrincipal: newProductoSubasta.foto,
      foto1: newProductoSubasta.foto1,
      foto2: newProductoSubasta.foto2,
      foto3: newProductoSubasta.foto3,
      precio: newProductoSubasta.precio,
      vendedor: newProductoSubasta.vendedor,
      fechaLimite: newProductoSubasta.fechaLimite,
      horaLimite: newProductoSubasta.horaLimite,
      provincia: newProductoSubasta.provincia
    }).then(res => {
      return res.data
    }).catch(err => {
      return err})
}

export const getProductos = () => {
    return axios
        .get('http://52.151.88.18:5000/listarEnVenta', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                //var fotos = getFotos(val.id)
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia])
            })
            console.log(data)

            return data
        })
  }

  export const getSubastas = () => {
      return axios
          .get('http://52.151.88.18:5000/listarSubastas', {
              headers: { "Content-type": "application/json" }
          })
          .then(res => {
              var data = []
              Object.keys(res.data).forEach((key) => {
                  var val = res.data[key]
                  data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal, val.Provincia])
              })

              return data
          })
    }

  export const getEnVentaUsuario = (usuario) => {

    return axios
        .get(`http://52.151.88.18:5000/listarEnVentaDeUsuario/${usuario.login}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia])
            })

            return data
        })
  }

  export const getVentasAcabadas = (usuario) => {
    return axios
        .get(`http://52.151.88.18:5000/listarVentasAcabadas/${usuario.login}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia])
            })

            return data
        })
  }

  export const getSubastasEnCurso = (usuario) => {
    return axios
        .get(`http://52.151.88.18:5000/listarSubastasDeUsuario/${usuario.login}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal, val.Provincia])
            })

            return data
        })
  }

  export const getSubastasAcabadas = (usuario) => {
    return axios
        .get(`http://52.151.88.18:5000/listarSubastasAcabadas/${usuario.login}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal, val.Provincia])
            })

            return data
        })
  }

  export const getProductosMayorMenor = () => {
      return axios
          .get('http://52.151.88.18:5000/listarVentasMayorMenor', {
              headers: { "Content-type": "application/json" }
          })
          .then(res => {
              var data = []
              Object.keys(res.data).forEach((key) => {
                  var val = res.data[key]
                  data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia])
              })

              return data
          })
    }

    export const getProductosMenorMayor = () => {
        return axios
            .get('http://52.151.88.18:5000/listarVentasMenorMayor', {
                headers: { "Content-type": "application/json" }
            })
            .then(res => {
                var data = []
                Object.keys(res.data).forEach((key) => {
                    var val = res.data[key]
                    data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal, val.Provincia])
                })

                return data
            })
      }


export const getSubastasMayorMenor = () => {
    return axios
        .get('http://52.151.88.18:5000/listarSubastasMayorMenor', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal, val.Provincia])
            })

            return data
        })
  }

export const getSubastasMenorMayor = () => {
    return axios
        .get('http://52.151.88.18:5000/listarSubastasMenorMayor', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal])
            })

            return data
        })
  }




export const tipoProducto = id => {
    return axios
        .get(`http://52.151.88.18:5000/obtenerTipoProducto/${id}`, {

        })
        .then(res => {
          return res.data
      })
  }

export const infoVenta = id => {
    return axios
        .get(`http://52.151.88.18:5000/obtenerDatosVenta/${id}`, {

        })
        .then(res => {
          var data = []
          data[0]=res.data.id
          data[1]=res.data.Nombre
          data[2]=res.data.Descripcion
          data[3]=res.data.Categoria
          data[4]=res.data.FotoPrincipal
          data[5]=res.data.Vendedor
          data[6]=res.data.Precio
          return data
      })
  }

export const infoSubasta = id => {
    return axios
        .get(`http://52.151.88.18:5000/obtenerDatosSubasta/${id}`, {

        })
        .then(res => {
            console.log(res.data.id)
            var data = []
            data[0]=res.data.id
            data[1]=res.data.Nombre
            data[2]=res.data.Descripcion
            data[3]=res.data.Categoria
            data[4]=res.data.FotoPrincipal
            data[5]=res.data.Vendedor
            data[6]=res.data.precio_salida
            data[7]=res.data.precio_actual
            data[8]=res.data.fecha_limite
            data[9]=res.data.hora_limite
            return data
        })
}


export const getFotos = id => {
    return axios
        .get(`http://52.151.88.18:5000/obtenerFotos/${id}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.foto])
            })
            return data
        })
  }

  export const actualizarProducto = producto => {
    return axios
        .post(`http://52.151.88.18:5000/modificarVenta`, {
            idP: producto.id,
            nombre: producto.nombre,
            fecha: producto.fecha,
            categoria: producto.categoria,
            descripcion: producto.descripcion,
            foto: producto.foto,
            precio: producto.precio
        })
        .then(response => {
          return response.data
        })
        .catch(err => {
          console.log(err)
        })
  }

export const eliminarProducto = producto => {
    return axios
      .post(
          `http://52.151.88.18:5000/eliminarVenta/${producto}`, {
              headers: { "Content-type": "application/json" }
          })
      .then((res) => {
          console.log(res)
      })
      .catch((res) => {
          console.log(res)
      })
}

export const eliminarSubasta = subasta => {
    return axios
      .post(
          `http://52.151.88.18:5000/eliminarSubasta/${subasta}`, {
              headers: { "Content-type": "application/json" }
          })
      .then((res) => {
          console.log(res)
      })
      .catch((res) => {
          console.log(res)
      })
}

  export const crearFavorito = (producto, id) => {
    return axios
        .post(
            `http://52.151.88.18:5000/crearFavorito/${id}`, {
                usuario: producto.usuario
            })
        .then((res) => {
            console.log(res)
        })
        .catch((res) => {
            console.log(res)
        })
  }

  export const eliminarFavorito = (producto, id) => {
    return axios
        .post(
            `http://52.151.88.18:5000/eliminarFavorito/${id}`, {
                usuario: producto.usuario
            })
        .then((res) => {
            console.log(res)
        })
        .catch((res) => {
            console.log(res)
        })
  }

  export const listarVentasFavoritos = (usuario) => {
    return axios
        .get(`http://52.151.88.18:5000/listarVentasFavoritas/${usuario}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.Precio, val.Categoria, val.FotoPrincipal])
            })

            return data
        })
  }

  export const listarSubastasFavoritos = (usuario) => {
    return axios
        .get(`http://52.151.88.18:5000/listarSubastasFavoritas/${usuario}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.Nombre, val.id, val.Descripcion, val.Vendedor, val.precio_actual, val.Categoria, val.fecha_limite, val.hora_limite, val.FotoPrincipal])
            })

            return data
        })
  }

  export const realizarOferta = (usuario, id, precio) => {
    return axios
        .post(
            `http://52.151.88.18:5000/hacerOfertaVenta/${id}/${precio}`, {
                usuario: usuario
            })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((res) => {
            console.log(res)
        })
  }

  export const realizarOfertaSubasta = (usuario, id, precio) => {
    return axios
        .post(
            `http://52.151.88.18:5000/hacerOfertaVentaSubasta/${id}/${precio}`, {
                usuario: usuario
            })
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((res) => {
            console.log(res)
        })
  }

  export const consultarFavorito = (producto, id) => {
    return axios
        .post(
            `http://52.151.88.18:5000/esFavorito/${id}`, {
                usuario: producto.usuario
            })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        })
  }