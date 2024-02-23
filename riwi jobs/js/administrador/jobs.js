import { getData,deleteData } from "../../connection/api.js";
import { cleanHtml } from "./clean.js";

//selectores
let urlJobs = "http://localhost:4000/jobs"
const tbody = document.querySelector(".listadoVacantes")
const save = document.querySelector("#save")
const cerrar = document.querySelector("#cerrar")
const cerrar2 = document.querySelector("#cerrar2")
const logOut = document.querySelector("#logOut")
//eventos

logOut.addEventListener("click", ()=>{

  localStorage.removeItem("sesion")
  window.location.href = "../../index.html"
})


document.addEventListener("DOMContentLoaded", () =>{
    cargarVacantes()
    validarModal()
})

cerrar.addEventListener("click", ()=>{
cerrarEditar()
})

cerrar2.addEventListener("click", ()=>{
    cerrarEditar()
})

//funciones
async function cargarVacantes(){
    //embed y validacion para solo traer los datos de la compañia que añadio la vacante
    const jobs = await getData(`${urlJobs}?_embed=company`)
    cleanHtml(tbody)

    const sesion = JSON.parse(localStorage.getItem("sesion"))

    //insertar datos en la tabla
    jobs.forEach(job => {
        const{id,title,experience,salary,location,modality,description} = job
        if(job.company.email === sesion[0].email){
            const tr = document.createElement("tr")
               tr.innerHTML += `
                   <td><div class="d-middle">
                   <img src="${sesion[0].imageCompany}" alt="img-product" width="50" height="30" class="img-fluid rounded-circle img-company" />
                 </div></td>
                   <td>${sesion[0].company}</td>
                   <td>${description}</td>
                   <td>${location}</td>
                   <td>${experience}</td>
                   <td>${modality}</td>
                   <td>${salary}</td>
                   <td>
                   <button class="btn btn-primary" idjob=${id} id="editar">
                     <i class="bx bx-edit" idjob=${id}></i>
                   </button>

                   <button class="btn btn-danger" idjob=${id} id="eliminar">
                     <i class="bx bx-trash" idjob=${id}></i>
                   </button>
                 </td>

               `
               tbody.appendChild(tr)
        }
     
    });

    save.classList.remove("edit")
    validarBotones()
}

function validarBotones(){
    const btnEditar = document.querySelectorAll("#editar") 
    const btnEliminar = document.querySelectorAll("#eliminar") 

    btnEditar.forEach(boton =>{
        boton.addEventListener("click", (e) =>{
          save.classList.add("edit")
            validarModal(e)
        })
    })

    btnEliminar.forEach(boton =>{
        boton.addEventListener("click", (e) =>{
          let id = e.target.getAttribute("idjob")

          let confirmar = confirm("¿estas seguro de que deseas eliminar esta vacante?")

          if(confirmar){
            deleteData(`http://localhost:4000/jobs/${id}`)
          }
        })
    })
}


function cerrarEditar(){
    window.location.href = "../../administrator.html"
}

async function validarModal(e){

    if(save.classList.contains("edit")){
        console.log(e.target.getAttribute("idjob"));
        document.querySelector("#staticBackdropLabel").textContent = "Editar perfil"
        document.querySelector("#btn-save").textContent = "Editar"
        document.querySelector("#abrirModal").click()

        const allJobs = await getData(`${urlJobs}?_embed=company`)

        const resultado = allJobs.filter(job => job.id === e.target.getAttribute("idjob"))
        
        resultado.forEach(elemento =>{
            const{id,title,experience,salary,location,modality,description} = elemento

            document.querySelector("#idJobUpdate").value = id
            document.querySelector("#title-job").value = title
            document.querySelector("#experience").value = experience
            document.querySelector("#salary").value = salary
            document.querySelector("#Location").value = location
            document.querySelector("#modality").value = modality
            document.querySelector("#description").value = description

        })

    }
}