class Pregunta {
    constructor(texto, opciones, correcta) {
        this.texto = texto;
        this.opciones = opciones;
        this.correcta = correcta;
    }
}

class Cuestionario {
    constructor(titulo, preguntas = []) {
        this.titulo = titulo;
        this.preguntas = preguntas;
        this.respuestas = [];
    }

    agregarPregunta(pregunta) {
        this.preguntas.push(pregunta);
    }

    almacenarRespuestas(usuario, respuestas) {
        this.respuestas.push({ usuario: usuario, respuestas: respuestas });
    }

    calificarRespuestas(respuestas) {
        let correctas = 0;
        this.preguntas.forEach((pregunta, preguntaIndex) => {
            if (respuestas[preguntaIndex] === pregunta.correcta) {
                correctas++;
            }
        });
        return correctas;
    }

    mostrarResultados(usuario, respuestas) {
        let correctas = this.calificarRespuestas(respuestas);
        let nota = ((correctas / this.preguntas.length) * 100).toFixed(2);
        alert(`Resultados del cuestionario "${this.titulo}": \nCorrectas: ${correctas}/${this.preguntas.length}\nNota: ${nota}%\nGracias por responder el cuestionario, valoramos mucho su participación.`);
        console.log(`Nota: ${nota}%`);
        usuario.agregarNota(this.titulo, nota);
    }
}

class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
        this.notas = [];
    }

    agregarNota(cuestionario, nota) {
        this.notas.push({ cuestionario: cuestionario, nota: nota });
    }
}

class SistemaCuestionarios {
    constructor() {
        this.cuestionarios = [];
        this.usuarios = [];
    }

    crearCuestionario() {
        let titulo = prompt("Ingrese el título del cuestionario:");
        let preguntas = [];

        for (let i = 0; i < 8; i++) { 
            let textoPregunta = prompt(`Ingrese el texto para la pregunta ${i + 1}:`);
            let opciones = [];
            for (let j = 0; j < 4; j++) {
                opciones.push(prompt(`Ingrese la opción ${j + 1} para la pregunta ${i + 1}:`));
            }
            let correcta = parseInt(prompt(`Ingrese el número de la opción correcta para la pregunta ${i + 1} (1-4):`), 10) - 1;
            preguntas.push(new Pregunta(textoPregunta, opciones, correcta));
        }

        let cuestionario = new Cuestionario(titulo, preguntas);
        this.cuestionarios.push(cuestionario);
        alert("El cuestionario ha sido creado satisfactoriamente.");

        let realizarCuestionario = parseInt(prompt("¿Desea realizar el cuestionario inmediatamente? (si=1, no=2)"), 10);
        if (realizarCuestionario === 1) {
            this.iniciarCuestionarioPorNumero();
        }
    }

    registrarUsuario() {
        let nombreUsuario = prompt("Ingrese su nombre de usuario:");
        let usuario = this.usuarios.find(u => u.nombre === nombreUsuario);
        if (!usuario) {
            usuario = new Usuario(nombreUsuario);
            this.usuarios.push(usuario);
        }
        return usuario;
    }

    responderCuestionario(usuario, cuestionario) {
        if (!cuestionario) {
            console.log("Cuestionario no encontrado.");
            return;
        }

        let respuestas = [];
        cuestionario.preguntas.forEach((pregunta, preguntaIndex) => {
            console.log(`${preguntaIndex + 1}. ${pregunta.texto}`);
            pregunta.opciones.forEach((opcion, opcionIndex) => {
                console.log(`  ${opcionIndex + 1}. ${opcion}`);
            });

            let respuesta = parseInt(prompt(`Ingrese el número de su respuesta para la pregunta ${preguntaIndex + 1} (1-4):`), 10) - 1;
            respuestas.push(respuesta);
        });

        cuestionario.almacenarRespuestas(usuario.nombre, respuestas);
        cuestionario.mostrarResultados(usuario, respuestas);
        alert("Cuestionario completado satisfactoriamente.");
    }

    mostrarCuestionarios() {
        console.log("Cuestionarios disponibles:");
        this.cuestionarios.forEach((cuestionario, index) => {
            console.log(`${index + 1}. ${cuestionario.titulo}`);
        });
    }

    iniciarCuestionarioPorNumero() {
        let usuario = this.registrarUsuario();
        this.mostrarCuestionarios();
        let numeroCuestionario = parseInt(prompt("Ingrese el número del cuestionario que desea responder:"), 10) - 1;

        if (numeroCuestionario >= 0 && numeroCuestionario < this.cuestionarios.length) {
            let cuestionarioSeleccionado = this.cuestionarios[numeroCuestionario];
            this.responderCuestionario(usuario, cuestionarioSeleccionado);
        } else {
            console.log("Número de cuestionario no válido.");
        }
    }
}

// Procedimiento principal
let sistemaCuestionarios = new SistemaCuestionarios();
sistemaCuestionarios.crearCuestionario();
