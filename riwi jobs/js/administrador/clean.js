export const cleanHtml = (selector) =>{


    while(selector.firstChild){
        selector.removeChild(selector.firstChild)
    }
}