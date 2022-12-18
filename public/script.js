const addBtn = document.getElementById("add")



addBtn.addEventListener("click", function (){
    console.log("CLICK")
    var inp = document.getElementById("inp-box").value
    make(inp)
    postReq(inp)
})

function make(item){
    const div = document.createElement("div")
    div.classList.add('new')
    const txtnode = document.createTextNode(item)
    txtnode.value = item
    div.appendChild(txtnode)
    var del = document.createElement('button')
    del.classList.add('delbtn')
    del.innerHTML = 'DELETE'
    var edit = document.createElement('button')
    edit.classList.add('editbtn')
    edit.innerHTML = 'EDIT'
    div.appendChild(edit)
    div.appendChild(del)

    document.body.appendChild(div)
    edit.addEventListener("click",()=>{
        console.log("KLIK")
        txtnode.value = edt(txtnode.value)
    })
    del.addEventListener("click",()=>{
        console.log("KLIK")
        delt(txtnode.value)
        div.remove()
    })
}

async function postReq(input){
    if (input != '') {
		

		await fetch('/api/todo/create', {
			method: 'POST',
			body: JSON.stringify({ ime: input }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		input = ''
	}
}
async function delt(a){
    await fetch('/api/todo/delete',{
        method : 'POST',
        body:JSON.stringify({ime : a}),
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

async function edt (input){
    const newInput = prompt('Edit :',input)
    
    await fetch('/api/todo/edit',{
        method : 'POST',
        body : JSON.stringify({old:input, new:newInput}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    return newInput
}


window.onload = async function (){
    const records = await fetch('/api/todo/get').then((t)=> t.json())
    console.log(records)
    records.forEach(({ime})=>{
        make(ime)
    })
}
