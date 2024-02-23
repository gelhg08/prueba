import { getData } from "../connection/api.js"

//selectores
let urlCompanies = "http://localhost:4000/companies"
const iniciar = document.querySelector("#iniciar")
const email = document.querySelector("#email")
const password = document.querySelector("#password")

//eventos
iniciar.addEventListener("submit", iniciarSesion)

//funciones
async function iniciarSesion(e){
    e.preventDefault()
    const companies = await getData(`${urlCompanies}?email=${email.value}`)

    //se valida si companies con la url trajo algo 
    if(companies.length == 0){
        Swal.fire({
            text: "correo o contraseña incorrectos",
            icon: "error"
        });
        return
    }

    if(companies[0].password !== password.value){
        Swal.fire({
            text: "correo o contraseña incorrectos",
            icon: "error"
        });
        return
    }

    //si todo esta bien guarda la sesion en el localstorage
    localStorage.setItem("sesion", JSON.stringify(companies))
    window.location.href = "administrator.html"

}