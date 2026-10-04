export class SonetoView {

    // Obtiene los elementos HTML que utiliza la vista.
    constructor() {
        this.selector = document.getElementById("selector-sonetos");
        this.titulo = document.getElementById("soneto-titulo");
        this.autor = document.getElementById("soneto-autor");
        this.contenido = document.getElementById("soneto-contenido");
    }


    // Muestra un mensaje mientras se cargan los sonetos.
    mostrarCargando() {
        this.selector.disabled = true;

        this.titulo.textContent = "Cargando sonetos...";
        this.autor.textContent = "";

        this.contenido.replaceChildren();

        const mensaje = document.createElement("p");

        mensaje.classList.add("soneto__mensaje");
        mensaje.textContent = "Preparando la colección de sonetos.";

        this.contenido.append(mensaje);
    }


    // Añade los sonetos disponibles al selector.
    mostrarOpciones(sonetos) {
        this.selector.replaceChildren();

        const opcionInicial =
            document.createElement("option");

        opcionInicial.value = "";
        opcionInicial.textContent =
            "Selecciona un soneto";

        opcionInicial.disabled = true;
        opcionInicial.selected = true;

        this.selector.append(opcionInicial);


        sonetos.forEach((soneto) => {
            const opcion =
                document.createElement("option");

            opcion.value = soneto.id;

            opcion.textContent =
                `${soneto.titulo} — ${soneto.autor}`;

            this.selector.append(opcion);
        });


        this.selector.disabled = false;

        this.titulo.textContent =
            "Selecciona un soneto";

        this.autor.textContent = "";

        this.contenido.replaceChildren();

        const mensaje =
            document.createElement("p");

        mensaje.classList.add(
            "soneto__mensaje"
        );

        mensaje.textContent =
            "Escoge un soneto para comenzar la lectura.";

        this.contenido.append(mensaje);
    }


    // Muestra el título, autor y versos del soneto.
    mostrarSoneto(soneto) {
        this.titulo.textContent =
            soneto.titulo;

        this.autor.textContent =
            soneto.autor;

        this.contenido.replaceChildren();


        const distribucionEstrofas =
            [4, 4, 3, 3];

        let indiceVerso = 0;


        distribucionEstrofas.forEach(
            (numeroVersos) => {

                const estrofa =
                    document.createElement("p");

                estrofa.classList.add(
                    "soneto__estrofa"
                );


                for (
                    let i = 0;
                    i < numeroVersos;
                    i++
                ) {

                    const verso =
                        document.createElement(
                            "span"
                        );

                    verso.classList.add(
                        "soneto__verso"
                    );

                    verso.textContent =
                        soneto.versos[indiceVerso];

                    estrofa.append(verso);

                    indiceVerso++;
                }


                this.contenido.append(
                    estrofa
                );
            }
        );
    }


    // Muestra un mensaje cuando ocurre un error.
    mostrarError(mensaje) {
        this.selector.disabled = true;

        this.titulo.textContent = "Error";

        this.autor.textContent = "";

        this.contenido.replaceChildren();


        const error =
            document.createElement("p");

        error.classList.add(
            "soneto__mensaje"
        );

        error.textContent = mensaje;

        this.contenido.append(error);
    }


    // Detecta cuándo el usuario selecciona un soneto.
    enlazarSeleccion(manejador) {
        this.selector.addEventListener(
            "change",
            (evento) => {
                manejador(
                    evento.target.value
                );
            }
        );
    }
}