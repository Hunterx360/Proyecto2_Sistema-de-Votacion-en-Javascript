class Encuesta {
    constructor() {
        this.preguntas = [];
    }

    agregarPregunta(pregunta, respuestas) {
        this.preguntas.push({ pregunta, respuestas: respuestas.map(respuesta => ({ respuesta, votos: 0 })) });
        console.log(`Pregunta ${this.preguntas.length}: ${pregunta}`);
        respuestas.forEach((respuesta, i) => console.log(`  Opción ${i + 1}: ${respuesta}`));
    }

    mostrarEncuesta() {
        console.log('Encuesta');
        this.preguntas.forEach((p, i) => {
            console.log(`Pregunta ${i + 1}: ${p.pregunta}`);
            p.respuestas.forEach((r, j) => console.log(`  Opción ${j + 1}: ${r.respuesta}`));
        });
    }

    votar(indicePregunta, indiceRespuesta) {
        let pregunta = this.preguntas[indicePregunta];
        if (pregunta && pregunta.respuestas[indiceRespuesta]) pregunta.respuestas[indiceRespuesta].votos++;
        else console.log("Índices de pregunta o respuesta no válidos.");
    }

    mostrarResultados() {
        console.log('--- Resultados de la Encuesta ---');
        this.preguntas.forEach((p, i) => {
            console.log(`Pregunta ${i + 1}: ${p.pregunta}`);
            p.respuestas.forEach((r, j) => console.log(`  Opción ${j + 1}: ${r.respuesta} - Votos: ${r.votos}`));
        });
    }
}

function iniciarEncuesta() {
    const encuesta = new Encuesta();

    const pedirNumero = mensaje => {
        let valor;
        do { valor = prompt(mensaje).trim(); } while (isNaN(valor) || valor === "");
        return parseInt(valor);
    };

    let numPreguntas = pedirNumero("¿Cuántas preguntas quieres agregar a la encuesta?");
    while (numPreguntas < 8) numPreguntas = pedirNumero("Deben ser mínimo 8");

    for (let i = 1; i <= numPreguntas; i++) {
        let pregunta = prompt(`Ingrese la pregunta ${i}:`).trim();
        while (!pregunta) pregunta = prompt(`La pregunta ${i} no puede estar en blanco. Ingrese la pregunta ${i}:`).trim();

        let numRespuestas = pedirNumero(`¿Cuántas respuestas desea para la pregunta ${i}?`);
        while (numRespuestas <= 0) numRespuestas = pedirNumero(`Debe ingresar al menos una respuesta para la pregunta ${i}.`);

        let respuestas = [];
        for (let j = 1; j <= numRespuestas; j++) {
            let respuesta = prompt(`Ingrese la respuesta ${j} para la pregunta ${i}:`).trim();
            while (!respuesta) respuesta = prompt(`La respuesta ${j} para la pregunta ${i} no puede estar en blanco. Ingrese la respuesta ${j}:`).trim();
            respuestas.push(respuesta);
        }

        encuesta.agregarPregunta(pregunta, respuestas);
    }

    encuesta.mostrarEncuesta();

    const votar = () => {
        let indicePregunta = pedirNumero(`Ingrese el número de la pregunta (1 - ${encuesta.preguntas.length}) a la que desea responder:`) - 1;
        let respuestas = encuesta.preguntas[indicePregunta]?.respuestas;
        while (!respuestas) indicePregunta = pedirNumero(`Índice de pregunta no válido. Ingrese el número de la pregunta (1 - ${encuesta.preguntas.length}) a la que desea responder:`) - 1;

        let opcionesMensaje = `Opciones disponibles para la pregunta ${indicePregunta + 1}:\n`;
        respuestas.forEach((r, i) => opcionesMensaje += `  Opción ${i + 1}: ${r.respuesta}\n`);

        let indiceRespuesta = pedirNumero(`${opcionesMensaje}Ingrese el número de la opción de respuesta (1 - ${respuestas.length}):`) - 1;
        while (!respuestas[indiceRespuesta]) indiceRespuesta = pedirNumero(`${opcionesMensaje}Número de opción no válido. Ingrese el número de la opción de respuesta (1 - ${respuestas.length}):`) - 1;

        encuesta.votar(indicePregunta, indiceRespuesta);
        encuesta.mostrarResultados();

        if (confirm("¿Quieres realizar otro voto?")) votar();
        else encuesta.mostrarResultados();
    };

    votar();
}

iniciarEncuesta();
