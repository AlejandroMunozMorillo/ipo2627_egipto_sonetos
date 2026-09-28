import { SonetoModel } from "./SonetoModel.js";
import { SonetoView } from "./SonetoView.js";
import { SonetoController } from "./SonetoController.js";


const modelo = new SonetoModel();

const vista = new SonetoView();

const controlador = new SonetoController(
    modelo,
    vista
);


controlador.iniciar();