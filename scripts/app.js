
 document.getElementById('btnGet1').addEventListener('click', function() {
  const inputGet1Id = document.getElementById('inputGet1Id').value;
  const resultsList = document.getElementById('results');

  if (inputGet1Id === '') {
    // Muestra la lista completa si el campo está vacío
    fetch('https://654a3faee182221f8d52cf22.mockapi.io/users/')
      .then(response => response.json())
      .then(data => {
        resultsList.innerHTML = '';
        data.forEach(user => {
          resultsList.innerHTML += `<li>
                                       ID: ${user.id} 
                                       <br>
                                       NAME: ${user.name}
                                       <br> 
                                       LASTNAME: ${user.lastname}
                                    </li>
                                    <br> `;
        });
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  } else {
    // Buscar el registro correspondiente al ID
    fetch(`https://654a3faee182221f8d52cf22.mockapi.io/users/${inputGet1Id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Usuario no encontrado');
        }
      })
      .then(data => {
        resultsList.innerHTML = `<li>
                                   ID: ${data.id} 
                                   <br>
                                   NAME: ${data.name}
                                   <br> 
                                   LASTNAME: ${data.lastname}
                                 </li>
                                 <br> `;
      })
      .catch(error => {
        console.error('Error al obtener el usuario:', error);
        resultsList.innerHTML = '';
        handleErrorResponse(); // Alerta en caso de ID inexistente en los registros
      });
  }
});


  document.getElementById('btnPost').addEventListener('click', function() {
    const inputPostNombre = document.getElementById('inputPostNombre').value;
    const inputPostApellido = document.getElementById('inputPostApellido').value;
    const resultsList = document.getElementById('results');
  
    const newUser = {
      name: inputPostNombre,
      lastname: inputPostApellido,
    };
  
    // Realiza una solicitud POST para agregar un nuevo usuario al servidor.
    fetch('https://654a3faee182221f8d52cf22.mockapi.io/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        // Después de agregar el usuario, obtén la lista actualizada de registros.
        return fetch('https://654a3faee182221f8d52cf22.mockapi.io/users/');
      })
      .then(response => response.json())
      .then(data => {
        // Muestra la lista actualizada en la interfaz.
        resultsList.innerHTML = '';
        data.forEach(user => {
          resultsList.innerHTML += `<li>
                                      ID: ${user.id} 
                                      <br>
                                      NAME: ${user.name}
                                      <br> 
                                      LASTNAME: ${user.lastname}
                                   </li>
                                   <br> `;
        });
      })
      .catch(error => {
        console.error('Error al agregar usuario:', error);
        resultsList.innerHTML = ''; // Limpia la lista si hay un error.
      });
  });


  document.getElementById('btnPut').addEventListener('click', function() {
    const inputPutId = document.getElementById('inputPutId').value;
  
    // Realiza una solicitud GET para obtener el registro correspondiente al ID.
    fetch(`https://654a3faee182221f8d52cf22.mockapi.io/users/${inputPutId}`)
      .then(response => response.json())
      .then(data => {
        // Llena los campos del modal con los valores del registro.
        document.getElementById('inputPutNombre').value = data.name;
        document.getElementById('inputPutApellido').value = data.lastname;
  
        // Abre el modal.
        $('#dataModal').modal('show');
      })
      .catch(error => {
        console.error('Error al obtener el usuario para modificar:', error);
      });
  });
  
  //agregamos evento click al boton "modificar" ,creamos variables para los campos de entrada
  document.getElementById('btnSendChanges').addEventListener('click', function() {
    const inputPutId = document.getElementById('inputPutId').value;
    const inputPutNombre = document.getElementById('inputPutNombre').value;
    const inputPutApellido = document.getElementById('inputPutApellido').value;
    const resultsList = document.getElementById('results');
  
    const updatedUser = {
      name: inputPutNombre,
      lastname: inputPutApellido,
    };
  
    // Realiza una solicitud PUT para modificar el registro correspondiente al ID.
    fetch(`https://654a3faee182221f8d52cf22.mockapi.io/users/${inputPutId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => response.json())
      .then(data => {
        // Después de modificar el usuario, obtén la lista actualizada de registros.
        return fetch('https://654a3faee182221f8d52cf22.mockapi.io/users');
      })
      .then(response => response.json())
      .then(data => {
        // Muestra la lista actualizada en la interfaz.
        resultsList.innerHTML = '';
        data.forEach(user => {
          resultsList.innerHTML += `<li>
                                      ID: ${user.id} 
                                      <br>
                                      NAME: ${user.name}
                                      <br> 
                                      LASTNAME: ${user.lastname}
                                   </li>
                                   <br> `;
        });
  
        // Cierra el modal.
        $('#dataModal').modal('hide');
      })
      .catch(error => {
        console.error('Error al modificar el usuario:', error);
        resultsList.innerHTML = ''; // Limpia la lista si hay un error.
  
        // Cierra el modal.
        $('#dataModal').modal('hide');
      });
  });


  //Aqui configuramos el DELETE de nuestro CRUD

  document.getElementById('btnDelete').addEventListener('click', function() {
    const inputDeleteId = document.getElementById('inputDelete').value;
    const resultsList = document.getElementById('results');
  
    // Realiza una solicitud DELETE para eliminar el registro correspondiente al ID.
    fetch(`https://654a3faee182221f8d52cf22.mockapi.io/users/${inputDeleteId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Después de eliminar el usuario, obtén la lista actualizada de registros.
        return fetch('https://654a3faee182221f8d52cf22.mockapi.io/users');
      })
      .then(response => response.json())
      .then(data => {
        // Muestra la lista actualizada en la interfaz.
        resultsList.innerHTML = '';
        data.forEach(user => {
          resultsList.innerHTML += `<li>
                                      ID: ${user.id} 
                                      <br>
                                      NAME: ${user.name}
                                      <br> 
                                      LASTNAME: ${user.lastname}
                                    </li>
                                    <br> `;
        });
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
        resultsList.innerHTML = ''; // Limpia la lista si hay un error.
      });
  });


  // A evento de escucha a los campos de entrada relevantes.
//document.getElementById('inputGet1Id').addEventListener('input', toggleGetButton);
document.getElementById('inputPostNombre').addEventListener('input', togglePostButton);
document.getElementById('inputPostApellido').addEventListener('input', togglePostButton);
document.getElementById('inputPutId').addEventListener('input', togglePutButton);
document.getElementById('inputDelete').addEventListener('input', toggleDeleteButton);

// Funciones para desactivar/activar los botones según el estado de los campos.



//funcion para desactivar boton en el campo de inserción de nuevo registro si no se ingresan valores 
function togglePostButton() {
    const btnPost = document.getElementById('btnPost');
    const inputPostNombre = document.getElementById('inputPostNombre').value;
    const inputPostApellido = document.getElementById('inputPostApellido').value;
    btnPost.disabled = inputPostNombre === '' || inputPostApellido === '';
  };

//funcion para desactivar boton en el campo de Actualización de registro 
function checkIfIdExists(inputPutId) {
    return fetch(`https://654a3faee182221f8d52cf22.mockapi.io/users/${inputPutId}`)
      .then(response => {
        if (!response.ok) {
          handleErrorResponse();
          return false; // Retorna falso si el registro no se encuentra
        }
        return true; // Retorna verdadero si el registro se encuentra
      })
      .catch(error => {
        console.error('Error al obtener el usuario:', error);
        handleErrorResponse();
        return false; // Retorna falso si hay un error
      });
  }
  
  function togglePutButton() {
    const btnPut = document.getElementById('btnPut');
    const inputPutId = document.getElementById('inputPutId').value;
    const inputPutNombre = document.getElementById('inputPutNombre').value;
    const inputPutApellido = document.getElementById('inputPutApellido').value;
  
    // Desactiva el botón si el campo de ID está vacío
    btnPut.disabled = !inputPutId || !inputPutNombre || !inputPutApellido;
  
    if (inputPutId) {
      checkIfIdExists(inputPutId)
        .then(idExists => {
          if (!idExists) {
            // Si el ID no existe, mostrar la alerta y deshabilitar el botón
            handleErrorResponse();
            btnPut.disabled = true;
          }
        });
    }
  }
// Función para comprobar si el ID existe
function checkIfIdExists(id) {
    return fetch(`https://654a3faee182221f8d52cf22.mockapi.io/users/${id}`)
      .then(response => response.ok);
  }
  
  function togglePutButton() {
    const btnPut = document.getElementById('btnPut');
    const inputPutId = document.getElementById('inputPutId').value;
    const inputPutNombre = document.getElementById('inputPutNombre').value;
    const inputPutApellido = document.getElementById('inputPutApellido').value;
  
    btnPut.disabled = inputPutId === '' || inputPutNombre === '' || inputPutApellido === '';
  
    if (inputPutId) {
      checkIfIdExists(inputPutId)
        .then(idExists => {
          if (!idExists) {
            handleErrorResponse();
            btnPut.disabled = true;
          } else {
            btnPut.disabled = false;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
  
  function toggleDeleteButton() {
    const btnDelete = document.getElementById('btnDelete');
    const inputDeleteId = document.getElementById('inputDelete').value;
  
    btnDelete.disabled = inputDeleteId === '';
  
    if (inputDeleteId) {
      checkIfIdExists(inputDeleteId)
        .then(idExists => {
          if (!idExists) {
            handleErrorResponse();
            btnDelete.disabled = true;
          } else {
            btnDelete.disabled = false;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
  

  function handleErrorResponse() {
    alert('Los datos que solicita no figuran en nuestros registros.');
  };
  
  function handleSuccessResponse() {
    alert('Solicitud procesada con éxito.');
  };

  // Llamadas a las funciones de desactivación de botones al inicio para asegurarte de que estén desactivados si los campos están vacíos.

togglePostButton();
togglePutButton();
toggleDeleteButton();
//llamadas a las funciones de alerta de error y de ingeso de datos correctos


  