function updateGraph(hero){
    const graph = $('#grafico')
    const powerStats = $.map(hero.powerstats, function(value,key){
        return{
            y: value,
            label: key,
        }
    })
    
    let graphConfig = {
        title: {
            text: `Estadisticas de poder para ${hero.name}`
        },
        animationEnabled: true,
        data: [{
            type: 'pie',
            toolTipContent: '<b>{label}</b>: {y}',
            showInLegend: 'true',
            legendText: '{label}',
            indexLabelFontSize: 16,
            indexLabel: '{label} ({y})',
            dataPoints: powerStats
        }]
    }
    graph.CanvasJSChart(graphConfig) 
}


function showHero(hero) {
    const infoHeroArticle = $('#infoHero')
    infoHeroArticle.html(`
                <div class="card">
                    <div class="row row-cols-2">
                        <img src="${hero.image}" alt="">
                        <div class="card-body">
                            <h5>
                                ${hero.name}
                            </h5>
                            <p>
                                Conexiones: ${hero.connections}
                            </p>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Publicado por: ${hero.publisher}</li>
                                <li class="list-group-item">Ocupación: ${hero.occupation}</li>
                                <li class="list-group-item">Primera aparición: ${hero.first_appearance}</li>
                                <li class="list-group-item">Altura: ${hero.height.join(' - ')}</li>
                                <li class="list-group-item">Peso: ${hero.weight.join(' - ')}</li>
                                <li class="list-group-item">Sobrenombres: ${hero.aliases}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="grafico" style="height: 450px;width: 50%;"></div>
    `)
    updateGraph(hero)
}

function getHero(id) {
    $.ajax({
        url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
        method: 'GET',
        success(resp) {
            const hero = {
                image: resp.image.url,
                name: resp.name,
                connections: resp.connections['group-affiliation'],
                publisher: resp.biography.publisher,
                occupation: resp.work.occupation,
                first_appearance: resp.biography['first-appearance'],
                height: resp.appearance.height,
                weight: resp.appearance.weight,
                aliases: resp.biography.aliases,
                powerstats: resp.powerstats,
            }
            showHero(hero)
        },
        error(e) {
            console.log(e)
        }

    })
}

$('document').ready(function () {
    const finderForm = $('#finder')
    const heroNumber = $('#superHeroNumber')


    finderForm.on('submit', function (event) {
        event.preventDefault()


        const heroID = parseInt(heroNumber.val())
        if (!isNaN(heroID) && heroID > 0 && heroID < 733) {
            getHero(heroID)
        }
    })
})