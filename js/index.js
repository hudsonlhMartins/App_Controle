let btn_add = document.getElementById('add')
let reset = document.getElementById('reset')
let btn_save = document.getElementById('save')
let btn_clear = document.getElementById('clear')
let btn_deleteListe = document.getElementById('deleteList')

let objetos = [
    {'Kind':'rice', 'amount':'5', 'value':'29'},
    {'Kind':'beer', 'amount':'29', 'value':'1.20'},
    {'Kind':'butter', 'amount':'5', 'value':'5.9'}
]

function getTotal(list){
    let total = 0
    for(let key in list){
        total +=list[key].value *list[key].amount
    }
    if(total >=1000){
        document.getElementById('id').classList.add('active')
        document.querySelector('.span span').innerHTML = formatValue(total)

    }else{
        document.getElementById('id').classList.remove('active')
        console.log(total)
        document.querySelector('.span span').innerHTML = formatValue(total)
    }
    
}

function setList(list){
    let table = '<thead><tr><td>Desc</td><td>amount</td><td>value</td><td>action</td></tr></thead><tbody>'
    for(let key in list){
        table += `<tr>
        <td>${formatKind(list[key].Kind)}</td>
        <td>${list[key].amount}</td>
        <td>${formatValue(list[key].value)}</td>
        <td><button id='edit' onclick='setUpdate(${key})' type="button" class="btn btn-secondary"> Editar</button>  |  <buuton id='delete' type="button" class="btn btn-warning" onclick='setDelete(${key})'>Deletar</button></td>
    </tr>`
    }
    table +='</tbody>'
    document.getElementById('tableList').innerHTML= table
    getTotal(objetos)
    saveList(objetos)
    // toda fez que da um set list vai salva a lista no ocal storage
    
}

function formatKind(kind){
    let letter = kind.toLowercase // transfoma em menusculo
    letter = kind.charAt(0).toUpperCase() + kind.slice(1);
    // transforma primeira letrar maiscula com charAt(0).toUppercase
    // e esta contatenando com as letras seguinte com kind.slipe (1)
    return letter
}
function formatValue(value){
    let src = parseFloat(value).toFixed(2) +''
    src = src.replace('.',',')
    src = '$'+src
    return src
}
btn_add.onclick = ()=>{
    // essa validação return 0 for negativa__
    // vai fazer oq esta no if la em baixo q retorna 0

    // se la for 1 ela vai seguir
    if(!validateForm()){
        return
    }

    let desc = document.getElementById('desc').value
    let amount = document.getElementById('amount').value
    let value = document.getElementById('value').value

        objetos.unshift({'Kind': desc, 'amount': amount, 'value': value })
        resetList()
        setList(objetos)
    
    
    // colocando no primeiro da lista, metado do array
}

function setUpdate(id){
    // esse id esta pegando o item do momento la de cima que traz o key__
    // e o item do momento, que traz sua posição no array
    let obj = objetos[id]
    document.getElementById('desc').value = obj.Kind
    document.getElementById('amount').value = obj.amount
    document.getElementById('value').value = obj.value
    document.getElementById('add').style.display = 'none'
    document.getElementById('save').style.display ='inline-block'
    document.getElementById('reset').style.display ='inline-block'
    document.getElementById('hidden_input').innerHTML = `<input id='idUpdate' type='hidden' value='${id}'>`
    // esse elemento idUpdate, criamos ele passo id (key) para__
    // podemos salva, pos o id return o index do elemento clicado

    btn_deleteListe.style.display = 'none'
}
let resetList = reset.onclick =()=>{
    document.getElementById('desc').value = ''
    document.getElementById('amount').value = ''
    document.getElementById('value').value = ''
    document.getElementById('add').style.display = 'inline-block'
    document.getElementById('save').style.display ='none'
    document.getElementById('reset').style.display ='none'
    btn_deleteListe.style.display = 'inline-block'


}

btn_save.onclick =()=>{
    if(!validateForm()){
        return
    }
    // pegando o value do input que e o parametro da function setUpdate__
    // que traz o item atual, la no for
    let id = document.getElementById('idUpdate').value
    const kind = document.getElementById('desc').value
    const amount = document.getElementById('amount').value
    const value = document.getElementById('value').value
    objetos[id] = {"Kind":kind, "amount":amount, "value": value}
    setList(objetos)
    
    resetList()
    
}

function setDelete(id){
    // se true ok vai entrar no if
    if(confirm('Delete this item?')){
        objetos.splice(id, 1)
        setList(objetos)
    }
}

function validateForm(){
    const kind = document.getElementById('desc').value
    const amount = document.getElementById('amount').value
    const value = document.getElementById('value').value
    let verificacao = false
    
    if(kind ===''){
        document.getElementById('desc').classList.add('ativador')
        verificacao = true
        setTimeout(()=>{
            document.getElementById('desc').classList.remove('ativador')
        },2000)
    }if(amount ===''){
        document.getElementById('amount').classList.add('ativador')
        verificacao = true

        setTimeout(()=>{
            document.getElementById('amount').classList.remove('ativador')
        },2000)
    }else if(amount !=parseInt(amount)){
        // se o amount for diferente da converção do amount para um numero__
        // que dize se ele colocar um string não vai converte para um numero__
        // caso user coloque um numero ele vai converte para um numero inteiro
        verificacao = true

        document.getElementById('amount').classList.add('ativador')
        setTimeout(()=>{
            document.getElementById('amount').classList.remove('ativador')
        },2000)
    }
    if(value === ''){
        document.getElementById('value').classList.add('ativador')
        verificacao = true

        setTimeout(()=>{
            document.getElementById('value').classList.remove('ativador')
        },2000)
    }else if(value !=parseFloat(value)){
        document.getElementById('value').classList.add('ativador')
        verificacao = true

        setTimeout(()=>{
            document.getElementById('value').classList.remove('ativador')
        },2000)    }

    if(verificacao == true){
        return 0
        // 0 segnifica false
    }else{
        return 1
        // 1 sig true
    }
}

btn_clear.onclick = ()=>{
    document.getElementById('desc').value = ''
    document.getElementById('amount').value =''
    document.getElementById('value').value =''
}

btn_deleteListe.onclick = ()=>{
    if(confirm ('deleta essa lista')){
        objetos = []
        setList(objetos)
    }
    
}

function saveList(list){
    // transforma json e sntring__
    // para salva no localstorege so pode string
    let jsonStr = JSON.stringify(list)
    localStorage.setItem('lista', jsonStr)
    // passa dois parametro 1° e o nome que vc quer que apareca__
    // depois o oq vc quer salva, lembrar que tem que ser string
    // aqui salvando a lista no local 
}

function initListStorage(){
    let testeList = localStorage.getItem('lista')
    //esse get e para ver se a lista ja esta no local storage
    if(testeList){
        // se isso for true, vai fazer isso
        // colocando no objeto, o valor testeList so que convertendo ele para json dnv
        objetos = JSON.parse(testeList)
    }
    setList(objetos)
}
initListStorage()