let qtdPosts = 5
let page = 1
let urlRequest = `https://jsonplaceholder.typicode.com/posts`

const getPosts = async () => {
    const response = await fetch(urlRequest)
    return response.json()
}

const postInDOM = async (fposts) => {
    let posts = await fposts

    if(posts != null){
        let postsTamplate = posts.map(item => `
        <div>${item.id}</div>
        <h2>${item.title}</h2>
        <p>${item.body}</p>
        `).join('')

        let divPosts = document.querySelector('.divPosts')
        divPosts.innerHTML = postsTamplate
    }
}

const inicial = async () => {
    let postsHome = await getPosts()
    let postsHomeAux = []

    for(let i = page-1; i < qtdPosts; i++){
        postsHomeAux[i] = postsHome[i]
    }

    postInDOM(postsHomeAux)
}

const prox = async () => {
    let posts = await getPosts()
    let postsAux = []

    page++

    if(page <= Math.ceil(posts.length/qtdPosts)){

        for(let i = (qtdPosts*(page-1)); i < qtdPosts*page && i < posts.length; i++){
            postsAux[i] = posts[i]
        }

    } else if(page == (posts.length/qtdPosts) + 1){
        alert('Você está na última página!')
        page--

        for(let i = (qtdPosts*(page-1)); i < qtdPosts*page; i++){
            postsAux[i] = posts[i]
        }
    }

    postInDOM(postsAux)
}

const ant = async () => {
    let posts = await getPosts()
    let postsAux = []
    
    page--

    if(page >= 1){
        for(let i = (qtdPosts*(page-1)); i < qtdPosts*page; i++){
            postsAux[i] = posts[i]
        }

    } else if (page == 0){
        alert('Você está na primeira página!')
        page++
        
        for(let i = (qtdPosts*(page-1)); i < qtdPosts*page; i++){
            postsAux[i] = posts[i]
        }
    }

    postInDOM(postsAux)
}
