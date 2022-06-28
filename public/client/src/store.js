import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        usuarios : [],
        urlUsuarios: 'http://localhost:4444/users/',
        usuarioActual: null
    },
    actions : {
        getUsuarios({commit}) {
            commit('getUsuarios')
        }, 
        postUsuario({commit},usuario) {
            commit('postUsuario',usuario)
        },
        enviarUsuarioActual({commit},usuario){
            commit('enviarUsuarioActual',usuario)
        }
    },
    mutations : {
        async getUsuarios(state) {
            try {
                let { data: usuarios } = await axios(state.urlUsuarios, {'content-type':'application/json'})
                console.log(usuarios)
                state.usuarios = usuarios
             }
             catch(error) {
               console.error('Error en getUsuario', error.message)
             }
        }, 
        async postUsuario(state,usuario){
            try {
                await axios.post(state.urlUsuarios, usuario, {'content-type':'application/json'} )
             }
             catch(error) {
               console.error('Error en postUsuario', error.message)
             }
        },
        enviarUsuarioActual(state,usuario){
            state.usuarioActual = usuario
        }
    }
})