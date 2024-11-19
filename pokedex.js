function reiniciarYOcultar() {
    const elemento = document.getElementById("miElemento");
    const gif = document.getElementById("gif");
    const pokedex = document.getElementById("pokedex");

    setTimeout(() => {
        elemento.style.display = "none";
        document.getElementById("pokedex-wrapper").style.display = "block";
        pokedex.style.display = "block";
    }, 2200);

    const gifSrc = gif.src;
    gif.src = "";
    gif.src = gifSrc;
}

function buscar() {
    let caja = document.getElementById("nombre");

    document.getElementById("imagen").src = "";
    document.getElementById("name").innerHTML = "";
    document.getElementById("type").innerHTML = "";

    if (caja.value == "") {
        alert("Ingrese el nombre de un Pokémon");
        caja.focus();
    } else {
        caja.value = caja.value.toLowerCase();
        let url = "https://pokeapi.co/api/v2/pokemon/" + caja.value;

        document.getElementById("pokedex").style.display = "none";
        const elemento = document.getElementById("miElemento");
        const gif = document.getElementById("gif");
        elemento.style.display = "block";

        const gifSrc = gif.src;
        gif.src = "";
        gif.src = gifSrc;

        setTimeout(reiniciarYOcultar, 100);

        var ajax = new XMLHttpRequest();

        ajax.open('GET', url, true);
        ajax.send();

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    let pokemon = JSON.parse(ajax.responseText);

                    setTimeout(() => {
                        let name = pokemon.name;
                        let type = pokemon.types[0].type.name;

                        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                        type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

                        document.getElementById("imagen").src = pokemon.sprites.other.home.front_default;
                        document.getElementById("name").innerHTML = name;
                        document.getElementById("type").innerHTML = type;
                        document.getElementById("info").style.display = "block";
                    }, 2200);
                } else {
                    // Si no se encuentra el Pokémon, mostrar "Not Found"
                    setTimeout(() => {
                        document.getElementById("name").innerHTML = "Not Found";
                        document.getElementById("type").innerHTML = "";
                        document.getElementById("imagen").src = "x.png";
                        document.getElementById("info").style.display = "block";
                    }, 2200);
                }
            }
        };
    }
}

document.getElementById("buscarBtn").addEventListener("click", buscar);
