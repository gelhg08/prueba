//correr en el puerto 4000

export const getData = async (url) => {
    try {
        const response = await fetch(url)
        const data = response.json()
        return data
    } catch (error) {
        console.error(error)
    }

}

export const sendData = async (url, datos) => {
    try {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)

        })

    } catch (error) {
        console.error(error);
    }
}

export const updateData = async (url, datos) => {
    try {
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)

        })

    } catch (error) {
        console.error(error);
    }
}

export const deleteData = (url) =>{
    try{
        fetch(url,{
            method: "DELETE"
        })
    }catch(error){
        console.log(error);
    }
}

