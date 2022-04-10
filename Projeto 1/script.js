let currentPage = 1
const USERS_PER_PAGE = 5

function deletarUser(id){
    users = users.filter(user => user.id != id)
    document.getElementById(`${id}`).remove()
    newPage()
}

function getCurrentPageUsers(){
    const starIndex = (currentPage - 1) * USERS_PER_PAGE
    const endIndex = starIndex + USERS_PER_PAGE
    return users.slice(starIndex, endIndex)
}

function createActions(user){
    let userAcoes = document.createElement('td')
    userAcoes.classList.add('action_buttons')

    let editarButton = document.createElement('button')
    editarButton.classList.add('text_button', 'edit_button')
    editarButton.appendChild(document.createTextNode('editar'))

    let deletarButton = document.createElement('button')
    deletarButton.classList.add('text_button', 'delete_button')
    deletarButton.appendChild(document.createTextNode('excluir'))
    deletarButton.setAttribute('type', 'button')
    deletarButton.addEventListener('click', () => deletarUser(user.id))

    userAcoes.appendChild(editarButton)
    userAcoes.appendChild(deletarButton)

    return userAcoes
}

function getUsers(){

    return getCurrentPageUsers().map(user => {
        let row = document.createElement('tr')
        row.setAttribute('id', user.id)

        let userNome = document.createElement('td')
        userNome.appendChild(document.createTextNode(`${user.first_name} ${user.last_name}`))
    
        let userEmail = document.createElement('td')
        userEmail.appendChild(document.createTextNode(user.email))
    
        let userCadastro = document.createElement('td')
        userCadastro.appendChild(document.createTextNode(user.created_at))
        
        row.appendChild(userNome)
        row.appendChild(userEmail)
        row.appendChild(userCadastro)
        row.appendChild(createActions(user))

        return row
    })
    
}

function getTotalPages(){
    return Math.ceil(users.length / USERS_PER_PAGE)
}

function newPage(){
    const userConteiner = document.querySelector('tbody')

    userConteiner.replaceChildren()

    getUsers().forEach(userElement => userConteiner.appendChild(userElement))

    renderPagination(getTotalPages())

}


function createButtonElement(textButton){
    const buttonElement = document.createElement('button')
    buttonElement.type = 'button'
    buttonElement.textContent = textButton

    return buttonElement
}

function goToPage(page){
    currentPage = page
    newPage()

}

function renderPagination(totalPages){
    const pagination = document.querySelector('.pagination')
    pagination.replaceChildren()

    const leftButton = createButtonElement('<<')
    pagination.appendChild(leftButton)
    leftButton.addEventListener('click', () => {
        if(currentPage == 1){
            goToPage(totalPages)
        }
        else{
            goToPage(currentPage-1)
        }
    })
    
    for(let i = 1 ; i <= totalPages; i++){
        
        
        const button = createButtonElement(`${i}`)

        if(i == currentPage){
            button.classList.add('active')
        }

        button.addEventListener('click', () => goToPage(i))
        
        pagination.appendChild(button)
    }

    const rightButton = createButtonElement('>>')
    pagination.appendChild(rightButton)
    rightButton.addEventListener('click', () => {
        if(currentPage == totalPages){
            goToPage(1)
        }
        else{
            goToPage(currentPage+1)
        }
        
    })
}

newPage()


