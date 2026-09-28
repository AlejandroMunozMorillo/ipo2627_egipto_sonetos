export class SonetoView {

    constructor() {
        this.selector = document.getElementById("selector-sonetos");
        this.titulo = document.getElementById("soneto-titulo");
        this.autor = document.getElementById("soneto-autor");
        this.contenido = document.getElementById("soneto-contenido");
    }


    mostrarOpciones(sonetos) {
        this.selector.replaceChildren();

        const opcionInicial = document.createElement("option");

        opcionInicial.value = "";
        opcionInicial.textContent = "Selecciona un soneto";
        opcionInicial.disabled = true;
        opcionInicial.selected = true;

        this.selector.append(opcionInicial);

        sonetos.forEach((soneto) => {
            const opcion = document.createElement("option");

            opcion.value = soneto.id;
            opcion.textContent = `${soneto.titulo} — ${soneto.autor}`;

            this.selector.append(opcion);
        });
    }


    mostrarSoneto(soneto) {
        this.titulo.textContent = soneto.titulo;
        this.autor.textContent = soneto.autor;

        this.contenido.replaceChildren();

        const distribucionEstrofas = [4, 4, 3, 3];

        let indiceVerso = 0;

        distribucionEstrofas.forEach((numeroVersos) => {

            const estrofa = document.createElement("p");

            estrofa.classList.add("soneto__estrofa");

            for (let i = 0; i < numeroVersos; i++) {

                if (indiceVerso >= soneto.versos.length) {
                    break;
                }

                const verso = document.createElement("span");

                verso.classList.add("soneto__verso");
                verso.textContent = soneto.versos[indiceVerso];

                estrofa.append(verso);

                indiceVerso++;
            }

            this.contenido.append(estrofa);
        });
    }


    mostrarError(mensaje) {
        this.titulo.textContent = "Error";
        this.autor.textContent = "";

        this.contenido.replaceChildren();

        const error = document.createElement("p");

        error.classList.add("soneto__mensaje");
        error.textContent = mensaje;

        this.contenido.append(error);
    }


    enlazarSeleccion(manejador) {
        this.selector.addEventListener("change", (evento) => {
            manejador(evento.target.value);
        });
    }
}