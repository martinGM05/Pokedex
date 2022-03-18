const API = 'https://pokeapi.co/api/v2/pokemon/';
const pokeNameInput = document.getElementById('inputName');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const containerImgPokemon = document.getElementById('imgPokemon');
const imgPokemon = document.getElementById('imgPokemon--img');
const namePokemon = document.getElementById('namePokemon');
const type = document.getElementById('typePokemon-type');
const statsContainer = document.getElementsByClassName('stats');

const textHeight = document.getElementById('textHeight');
const textWeight = document.getElementById('textWeight');
const typePokemon_p = document.getElementById('typePokemon-p');

const colorsType = {
    "rock": '#B69E31',
    "ghost": '#70559B',
    "steel": '#B7B9D0',
    "water": '#6493EB',
    "grass": '#74CB48',
    "psychic": '#FB5584',
    "ice": '#9AD6DF',  
    "dark": '#75574C',
    "fairy": '#E69EAC',
    "normal": '#AAA67F',
    "fighting": '#C12239',
    "flying": '#A891EC',
    "poison": '#A43E9E',
    "ground": '#DEC16B',
    "bug": '#A7B723',
    "fire": '#F57D31',
    "electric": '#F9CF30',
    "dragon": '#7037FF',
}

const typeSpanish = {
    "rock": "Roca",
    "ghost": "Fantasma",
    "steel": "Acero",
    "water": "Agua",
    "grass": "Planta",
    "psychic": "Psiquico",
    "ice": "Hielo",
    "dark": "Siniestro",
    "fairy": "Hada",
    "normal": "Normal",
    "fighting": "Lucha",
    "flying": "Volador",
    "poison": "Veneno",
    "ground": "Tierra",
    "bug": "Bicho",
    "fire": "Fuego",
    "electric": "Electrico",
    "dragon": "Dragón",
}

const dataStats = [];
const dataTypes = [];
const dataAbilities = [];
const statsObj = {
    "Hp": 0,
    "Ataque": 0,
    "Defensa": 0,
    "Ataque Especial": 0,
    "Defensa Especial" : 0,
    "Velocidad": 0,
};
const dataBasic = {
    "Peso": 0,
    "Altura": 0,
}

const searchPokemon = () => {
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    fetch(API + pokeName).then((res) => {
        if(res.status != "200"){
            console.log(res);
        }else{
            return res.json();
        }
    }).then((data) => {
        if(data){
            clearData();
            imgPokemon.style.backgroundImage = `url(${data.sprites.other["official-artwork"].front_default})`;
            namePokemon.innerHTML = data.name;
            dataStats.push(data.stats);
            getStats();
            getTypes(data.types);
            getAbilities(data.abilities);
            getDataBasic(data);
            textWeight.innerHTML = 'Peso: ';
            weight.innerHTML = `${dataBasic.Peso} kg`;
            textHeight.innerHTML = 'Altura: ';
            height.innerHTML = `${dataBasic.Altura} m`;
            typePokemon_p.innerHTML = 'Tipo: ';
            for(let i = 0; i < dataTypes.length; i++){
                let typeName = typeSpanish[dataTypes[i]];
                type.innerHTML += `<span class= 'span ${dataTypes[i]}'>${typeName}</span>`;
                containerImgPokemon.style.backgroundColor = colorsType[dataTypes[i]];
            }
            for(let key in statsObj){
                let span = document.createElement('span');
                span.classList.add('span');
                span.classList.add('resultStats');
                span.innerHTML = `${key}: ${statsObj[key]}`;
                statsContainer[0].appendChild(span);
            }
        }
    }) 
}

const clearData = () => {
    dataStats.length = 0;
    dataTypes.length = 0;
    dataAbilities.length = 0;
    statsObj.Hp = 0;
    statsObj.Ataque = 0;
    statsObj.Defensa = 0;
    statsObj["Defensa Especial"] = 0;
    statsObj["Ataque Especial"] = 0;
    statsObj.Velocidad = 0;
    dataBasic.Peso = 0;
    dataBasic.Altura = 0;
    let spans = document.getElementsByClassName('span');
    while(spans.length > 0){
        spans[0].parentNode.removeChild(spans[0]);
    }
    textHeight.innerHTML = '';
    textWeight.innerHTML = '';
    typePokemon_p.innerHTML = '';
    weight.innerHTML = '';
    height.innerHTML = '';
    imgPokemon.style.backgroundImage = '';
    namePokemon.innerHTML = '';
    containerImgPokemon.style.backgroundColor = 'rgb(221, 221, 221)';
    pokeNameInput.value = '';
}

const getDataBasic = (array) => {
    dataBasic.Peso = array.weight / 10;
    dataBasic.Altura = array.height / 10;
}

const getAbilities = (array) => { 
    array.forEach((ability) => {
        dataAbilities.push(ability.ability.name);
    });
}

const getTypes = ( array ) => {
    array.forEach((type) => {
        dataTypes.push(type.type.name);
    });
}

const getStats = () => {
    for(let i = 0; i < dataStats.length; i++){
        let stats = dataStats[i];
        statsObj.Hp += stats[0].base_stat;
        statsObj.Ataque += stats[1].base_stat;
        statsObj.Defensa += stats[2].base_stat;
        statsObj["Defensa Especial"] += stats[3].base_stat;
        statsObj["Ataque Especial"] += stats[4].base_stat;
        statsObj.Velocidad += stats[5].base_stat;
    }
    console.log(statsObj);
}
