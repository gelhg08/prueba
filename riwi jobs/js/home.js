import { getData } from "../connection/api.js"
import { cleanHtml } from "./administrador/clean.js";

//selectores
let urlJobs = "http://localhost:4000/jobs"
const jobs = await getData(urlJobs)
const container = document.querySelector(".container")
const filtrar = document.querySelector("#filtrar")
const filtrados = {
    title: "",
    modality: ""
}

//eventos

filtrar.addEventListener("submit", filtrarVacantes)

cargarVacantes(jobs)

//funciones

function filtrarVacantes(e){
    e.preventDefault()
    const titles = document.querySelector("#titles").value
    const modalities = document.querySelector("#modality-filter").value

    filtrados.title = titles
    filtrados.modality = modalities

    const resultado = jobs.filter(filtrarTitle).filter(filtrarModality)

    cargarVacantes(resultado)
}


function filtrarTitle(job){
    if(filtrados.title !== ""){
        return job.title === filtrados.title
    }else{
        return job
    }
}


function filtrarModality(job){
    if(filtrados.modality !== ""){
        return job.modality === filtrados.modality
    }else{
        return job
    }
}

function cargarVacantes(jobs){
    cleanHtml(container)

    jobs.forEach(job => {
        const{title,location,fechaCompleta,description,imagenJob,company} = job

        container.innerHTML += `
        <div class="card-job">
        <h2>${title}</h2>

        <p>
        De la compañia: ${company}
       </p>

       <p>
       ${description}
      </p>

        <div class="row">
          <div class="col-6">
            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-current-location"></i>
              <span class="fw-semibold">${location}</span>
            </div>

            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-time"></i>
              <span class="fw-semibold">${fechaCompleta}</span>
            </div>
          </div>

          <div class="col-6 d-flex justify-content-end">
            <img
              src="${imagenJob}"
              alt="logo"
              height="80"
              width="80"
              class="object-fit-contain rounded-circle img-company"
            />
          </div>
        </div>
      </div>
   
        `
    });
}