window.addEventListener('load', () => {
    const wordsList = document.getElementById('wordsList')

    fetchGetCards('http://localhost:3000/api/1.0/cards')
    //renderizar las palabras, pensar diseño
    /* cards.forEach(row => {
        console.log(row)
        wordsList.innerHTML += `<li></li>` 
    }) */


    async function fetchGetCards(url) {
        const settings = {
            method: 'GET',
            headers: {
                /* authorization: token, */
            },
        }
        try {
            const response = await fetch(url, settings)
            const cards = await response.json()
            console.log(cards)
            renderTable(cards)
        } catch (e) {
            console.log(e)
        }
    }

    function renderTable(table){
        document.getElementById('wordsList').innerHTML += `<li>
                                                                <ul class="row table-header">
                                                                    <li class="t-element t-word t-header">Word <i class="fas fa-sort"></i></li>
                                                                    <li class="t-element t-def t-header">Definition</li>
                                                                    <li class="t-element t-example t-header">Example</li>
                                                                    <li class="t-element t-audio"></li>
                                                                    <li class="t-element t-level t-header">Level <i class="fas fa-sort"></i></li>
                                                                    <li class="t-element t-edit t-header">Options</li>
                                                                </ul>
                                                            </li>`
        table.forEach((row,i) => {
          console.log(row)  
          document.getElementById('wordsList').innerHTML += `<li>
                                                                <ul class="row">
                                                                    <li class="t-element t-word">${row.word}
                                                                        <audio id="player-${i}" src="${row.audio}"></audio>
                                                                        <div>
                                                                            <a onclick="document.getElementById('player-${i}').play()"><i class="far fa-play-circle"></i></a>
                                                                        </div>
                                                                    </li>
                                                                    <li class="t-element t-def">${row.definition}</li>
                                                                    <li class="t-element t-example">${row.example}</li>
                                                                    <li class="t-element t-audio">${row.audio}</li>
                                                                    <li class="t-element t-level">
                                                                        <form name="formulario" method="post" action="/send.php">
                                                                        <meter min="0" max="100"
                                                                            low="25" high="75"
                                                                            optimum="100" value=${"50"}>
                                                                        </form>
                                                                    </li>
                                                                    <li class="t-element t-edit"><i class="far fa-edit"></i><i class="far fa-trash-alt"></i></li>
                                                                </ul>
                                                            </li>`
        })
    }
})