function setConfig(){
    let title ={
        name: 'App Controle'
    }
    document.title = title.name
    document.getElementById('navBar').innerHTML= title.name
}
setConfig()