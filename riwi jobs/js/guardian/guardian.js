(()=>{
    const sesion = JSON.parse(localStorage.getItem("sesion"))
    if(!sesion){
        window.location.href = "../../index.html"
    }
})()