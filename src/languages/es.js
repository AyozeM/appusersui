export default {
  es: {
    buttons: {
      add: 'añadir',
      edit: 'editar',
      remove: 'eliminar',
      update: 'actualizar',
      create: 'crear',
    },
    entities: {
      user: {
        one: 'usuario',
        many: 'usuarios'
      },
      role: {
        one: 'rol',
        many: 'roles'
      },
      privilege: {
        one: 'privilegio',
        many: 'privilegios'
      },

    },
    views: {
      asig_rol: 'roles actuales',
      asig_priv: 'privilegios actuales',
      all_rol: 'todos los roles',
      all_priv: 'todos los privilegios',
      name: 'nombre',
      email: 'correo electronico',
      username:'nombre de usuario',
      password: 'contraseña',
      remember: 'recuérdame',
      login: 'iniciar sesión',
      logout: 'cerrar sesión',
      welcome: 'Bienvenido',
      newPassword:'escribe una contraseña nueva',
      repeatPassword: 'confirma la contraseña',
      changePassword: 'cambiar contraseña',
      lists:{
        user:'listado de usuarios',
        role:'listado de roles',
        privilege:'listado de privilegios'
      }
    },
    messages: {
      error: {
        update: 'error al actualizar',
        add: 'error al añadir',
        find: 'recurso no econtrado',
        remove: 'error al eliminar',
        unexpected: 'error inesperado, compruebe que la conexion a internet es correcta y vuelva a intentarlo mas tarde',
      },
      info:{
        update: 'recurso actualizado correctamente',
        remove: 'recurso eliminado correctamente',
        add: 'recurso añadido correctamente',
      }
    },
  }
}
