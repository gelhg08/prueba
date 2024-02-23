import { getData, sendData,updateData } from "../../connection/api.js";

//selectores 
let urlJobs = "http://localhost:4000/jobs"
const save = document.querySelector("#save")

//eventos
save.addEventListener("submit", setVacancy)

//funciones

function setVacancy(e){
    e.preventDefault()


    //selectores del formulario
    const id = document.querySelector("#idJobUpdate").value
    const title = document.querySelector("#title-job").value
    const experience = document.querySelector("#experience").value
    const salary = document.querySelector("#salary").value
    const location = document.querySelector("#Location").value
    const modality = document.querySelector("#modality").value
    const description = document.querySelector("#description").value

    const sesion = JSON.parse(localStorage.getItem("sesion"))
    //crear nueva vacante

    const date = new Date()
    const day = date.getDay()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const fechaCompleta = day + "/" + month + "/" + year

    console.log(fechaCompleta);
    const newVacante = {
        title,
        experience,
        salary,
        location,
        modality,
        description,
        companyId: sesion[0].id,
        imagenJob: sesion[0].imageCompany,
        company: sesion[0].company,
        fechaCompleta
    }
    console.log(newVacante);

    if(save.classList.contains("edit")){
        updateData(`${urlJobs}/${id}`,newVacante)
        return
    }

    sendData(urlJobs, newVacante)

}