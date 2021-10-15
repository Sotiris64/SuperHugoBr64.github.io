window.onload = function () {
    let aux = '';
     
    receitas.forEach(recipe => {       
        let preparoAux = '';
        let ingredientesAux = '';

        recipe.preparo.forEach((preparo) =>{
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(preparo));
            preparoAux += li.outerHTML;
        })
        recipe.ingredientes.forEach(function(ingrediente){
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(ingrediente));
            ingredientesAux += li.outerHTML;
        })
    
      aux += `
        <h1>ID: ${recipe.id}</h1>
        <h1>${recipe.nome}</h1>
        <img src ="${recipe.foto}">
        <h3>${recipe.descricao}</h3>
        <h2>Preparo: </h2> <ol>${preparoAux}</ol>
        <h2>Ingredientes: </h2> <ul>${ingredientesAux}</ul>`;
    });
    document.querySelector('body').innerHTML = aux;
}



