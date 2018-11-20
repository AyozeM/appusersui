import axios from 'axios';
import { store } from '../store/store'

const baseurl = process.env.API;

export const resourceTypes = {
  user: 'users',
  rol: 'roles',
  privilege: 'privilege'
}
/**
 * Obtiene todos los resultados de un recurso
 * @param {String} resource recurso al que se quiere acceder
 */
export const getAll = resource => axios.get(`${baseurl}/${resource}/all`, {headers:{Authorization:store.state.userToken}});

/**
 * Obtiene un recurso por su identificador
 * @param {String} resource recurso al que se quiere acceder
 * @param {Number} id identificador de recurso
 */
export const getById = (resource, id) => axios.get(`${baseurl}/${resource}/show/${id}`, {headers:{Authorization:store.state.userToken}});

/**
 * Actualiza un recurso concreto
 * @param {String} resource recurso al que se quiere acceder
 * @param {Oject} body actualizaciones que se quieren ejecutar en el recuro
 */
export const update = (resource, body) => axios.put(`${baseurl}/${resource}/update`, body, {headers:{Authorization:store.state.userToken}});

/**
 * Añade un nuevo recurso
 * @param {String} resource recurso al que se quiere acceder
 * @param {Object} body datos del nuevo recurso
 */
export const add = (resource, body) => axios.post(`${baseurl}/${resource}/add`, body, {headers:{Authorization:store.state.userToken}});

/**
 * Elimina un recurso concreto
 * @param {String} resource recurso al que se quiere acceder
 * @param {Number} id identificador de recurso
 */
export const remove = (resource, id) => axios.delete(`${baseurl}/${resource}/remove/${id}`, {headers:{Authorization:store.state.userToken}});

/**
 * Obtiene token de autenticacion para el usuario pasado por parametro
 * @param {Object} credentials usuario y contraseña con el que se desea acceder al servidor
 */
export const login = credentials => axios.post(`${baseurl}/login`, credentials);

export const getAuthority = name => axios.get(`${baseurl}/users/authority/${name}`,{headers:{Authorization:store.state.userToken}});

export const createNewAccount = user => axios.post(`${baseurl}/users/register`,user);
