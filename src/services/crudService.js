import axios from 'axios';
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
export const getAll = resource => axios.get(`${baseurl}/${resource}/all`);

/**
 * Obtiene un recurso por su identificador
 * @param {String} resource recurso al que se quiere acceder
 * @param {Number} id identificador de recurso
 */
export const getById = (resource, id) => axios.get(`${baseurl}/${resource}/show/${id}`);

/**
 * Actualiza un recurso concreto
 * @param {String} resource recurso al que se quiere acceder
 * @param {Oject} body actualizaciones que se quieren ejecutar en el recuro
 */
export const update = (resource, body) => axios.put(`${baseurl}/${resource}/update`, body);

/**
 * Añade un nuevo recurso
 * @param {String} resource recurso al que se quiere acceder
 * @param {Object} body datos del nuevo recurso
 */
export const add = (resource, body) => axios.post(`${baseurl}/${resource}/add`, body);

/**
 * Elimina un recurso concreto
 * @param {String} resource recurso al que se quiere acceder
 * @param {Number} id identificador de recurso
 */
export const remove = (resource, id) => axios.delete(`${baseurl}/${resource}/remove/${id}`);
