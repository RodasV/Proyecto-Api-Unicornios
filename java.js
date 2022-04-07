 fetch(
      'https://unicorns-api.herokuapp.com/api/v1/unicorns/',
    )
      .then((result) => {
        return result.json();
      })
      .then(data => mostrarData(data))
    
      .catch((err) => {
        console.log(err);
      });

      const mostrarData = (data) => {
        console.log(data);
        data=data.reverse()
        let cuadro='';
        for(let i=0;i<data.length;i++){
            cuadro+=`<div id="datos"><img id="${data[i]._id}" onclick="obtenerIdUnicornios('${data[i]._id}')" class="cuadrito2" src=${data[i].image}> Nombre:${data[i].name} Poder: ${data[i].power} Edad: ${data[i].age} <div id="eliminar"><button id='${data[i]._id}' onclick="eliminar('${data[i]._id}')")>Eliminar del establo</button></div></div>` ;
        }
        document.querySelector('#cuadro').innerHTML=cuadro;
        document.querySelector('#cuadro').textContent.reverse();
      
    }
  
  //POST
  function agregarDatos() {
    const aNombre=document.querySelector('#a-nombre').value;
    const aPoder=document.querySelector('#a-poder').value;
    const aFoto=document.querySelector('#a-foto').value;
    const aEdad=document.querySelector('#a-edad').value;

     
    const data = {
      name: aNombre,
      power: aPoder,
      image: aFoto, 
      age: aEdad,
     };
  

     const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

  
    fetch('https://unicorns-api.herokuapp.com/api/v1/unicorns/', options,)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      alert("Se creó tu unicornio :D")
      window.location.reload()
    })
    .catch((err) => {
      alert("error, no se creó tu unicornio");
    });
    
  }


let idPrincipal='';
//MODIFICAR UNICORNIO

// function modificarUnicornio() {

function obtenerIdUnicornios(valor){

       fetch('https://unicorns-api.herokuapp.com/api/v1/unicorns/')
        .then(res => res.json())
        .then(datos => {
            for(let i of datos){
            
            }
            
            let seleccion=datos.filter(eachObj=>eachObj._id===valor);
            idPrincipal=seleccion[0]._id

            document.querySelector('#b-nombre').value=seleccion[0].name;
            document.querySelector('#b-poder').value=seleccion[0].power;
            document.querySelector('#b-foto').value=seleccion[0].image;
            document.querySelector('#b-edad').value=seleccion[0].age;
              
    }       
        )}


function modificarAceptar(){

    
        const modiNombre=document.querySelector('#b-nombre').value
        const modiPoder=document.querySelector('#b-poder').value
        const modiFoto=document.querySelector('#b-foto').value
        const modiEdad=document.querySelector('#b-edad').value

        const modificados = {
            name: modiNombre,
            power: modiPoder,
            image: modiFoto,
            age: modiEdad,
           };

        const dataM = {
            method: 'PUT',
            body: JSON.stringify(modificados),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          let url="https://unicorns-api.herokuapp.com/api/v1/unicorns/"
          let urlModificar=url+idPrincipal;
          fetch(urlModificar, dataM)
          .then((result) => {
           return result.json();
           })
           .then((result) => {
            console.log(result);
            alert("¡Se modificó tu unicornio!");
            window.location.reload()

            
            })
           .catch((err) => {
           console.log(err);
            });
              

       
}

//ELIMINAR UNICORNIO

function eliminar(variable){
  const dataD = {
    method: 'DELETE'
  };
    let url="https://unicorns-api.herokuapp.com/api/v1/unicorns/"
    let urlEliminar=url+variable;

    console.log(urlEliminar);

    fetch(urlEliminar,dataD)
    .then(res => res.json())
    .then(datos => {
        alert("Unicornio eliminado");
        window.location.reload()

      })
      .catch((err) => {
      console.log("No se pudo borrar. Vuelve a intentar")
       });
  }
     
