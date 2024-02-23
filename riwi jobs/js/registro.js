import { getData,sendData } from "../connection/api.js"

//selectores
const urlCompanies = "http://localhost:4000/companies"
const registrar = document.querySelector("#registrar")

//eventos
registrar.addEventListener("submit", validarRegistro)

//funciones
async function validarRegistro(e){
    e.preventDefault()
    //selectores del formulario de registro
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const confirmar = document.querySelector("#password-confirmation").value
    const company = document.querySelector("#company").value
    const imageCompany = document.querySelector("#img-company").value
    const nit = document.querySelector("#nit").value
    const companies = await getData(urlCompanies)

    //validar si el email o el nit estan registrados
    const emailExist = companies.some(company => company.email === email)
    const nitExist = companies.some(company => company.nit === nit)

    if(emailExist || nitExist){
        Swal.fire({
            text: "correo o nit ya registrado",
            icon: "error"
          });
        return
    }

    //validar si las contraseñas son diferentes
    if(password !== confirmar){
        Swal.fire({
            text: "Las contraseñas no coinciden",
            icon: "error"
          });
        return
    }

    //validar cantidad de caracteres del input
    if(password.length > 6 || confirmar.length > 6){
        Swal.fire({
            text: "La contraseña debe tener un minimo de 6 caracteres",
            icon: "error"
          });
        return
    }

    //enviar nuevo registro si pasa las condiciones

    const nuevo = {
        email,
        password,
        company,
        imageCompany,
        nit
    }

    setTimeout(()=>{
        sendData(urlCompanies, nuevo)
    }, 1500)

    Swal.fire({
        text: "compañia registrada con exito",
        icon: "success"
      });

}