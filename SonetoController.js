export class SonetoController {

    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }


    async iniciar() {
        try {
            const sonetos = await this.modelo.cargarSonetos();

            this.vista.mostrarOpciones(sonetos);

            this.vista.enlazarSeleccion(
                (id) => this.seleccionarSoneto(id)
            );

        } catch (error) {
            console.error(error);

            this.vista.mostrarError(
                "No se han podido cargar los sonetos."
            );
        }
    }


    seleccionarSoneto(id) {
        const soneto = this.modelo.obtenerSoneto(id);

        if (soneto === undefined) {
            this.vista.mostrarError(
                "No se ha encontrado el soneto seleccionado."
            );

            return;
        }

        this.vista.mostrarSoneto(soneto);
    }
}