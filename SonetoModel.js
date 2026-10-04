export class SonetoModel {

    constructor() {
        this.archivos = [
            {
                id: "mireLosMuros",
                ruta: "./sonetos/mireLosMuros.md"
            },
            {
                id: "mientrasPorCompetir",
                ruta: "./sonetos/mientrasPorCompetir.md"
            },
            {
                id: "eraseUnHombre",
                ruta: "./sonetos/eraseUnHombre.md"
            },
            {
                id: "escritoEstaEnMiALma",
                ruta: "./sonetos/escritoEstaEnMiALma.md"
            },
            {
                id: "unSonetoMeManda",
                ruta: "./sonetos/unSonetoMeManda.md"
            }
        ];

        this.sonetos = [];
    }


    async cargarSonetos() {
        const promesas = this.archivos.map(
            (archivo) => this.cargarArchivo(archivo)
        );

        this.sonetos = await Promise.all(promesas);

        return this.sonetos;
    }


    async cargarArchivo(archivo) {
        const respuesta = await fetch(archivo.ruta);

        if (!respuesta.ok) {
            throw new Error(
                `No se ha podido cargar ${archivo.ruta}`
            );
        }

        const texto = await respuesta.text();

        return this.procesarSoneto(texto, archivo.id);
    }


    procesarSoneto(texto, id) {
        const lineas = texto
            .split(/\r?\n/)
            .map((linea) => linea.trim())
            .filter((linea) => linea !== "");

        const lineaTitulo = lineas.find(
            (linea) => /^T[ií]tulo:/i.test(linea)
        );

        const lineaAutor = lineas.find(
            (linea) => /^Autor:/i.test(linea)
        );

        const indiceSoneto = lineas.findIndex(
            (linea) => /^Soneto:?$/i.test(linea)
        );

        if (
            lineaTitulo === undefined ||
            lineaAutor === undefined ||
            indiceSoneto === -1
        ) {
            throw new Error(
                `Formato incorrecto en el soneto ${id}`
            );
        }

        const titulo = this.limpiarCampo(
            lineaTitulo.replace(/^T[ií]tulo:\s*/i, "")
        );

        const autor = this.limpiarCampo(
            lineaAutor.replace(/^Autor:\s*/i, "")
        );

        const versos =
    lineas.slice(indiceSoneto + 1);


    if (versos.length !== 14) {
        throw new Error(
            `El soneto ${id} no contiene 14 versos`
    );
}

        return {
            id,
            titulo,
            autor,
            versos
        };
    }


    limpiarCampo(campo) {
        return campo
            .trim()
            .replace(/^["']|["']$/g, "");
    }


    obtenerSonetos() {
        return this.sonetos;
    }


    obtenerSoneto(id) {
        return this.sonetos.find(
            (soneto) => soneto.id === id
        );
    }
}