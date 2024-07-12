let cuestionarios = [];
let usuarios = [];

// Función para crear cuestionarios
const crearCuestionario = () => {
    let titulo = prompt("Ingrese el título del cuestionario:");
    let preguntas = [];

    for (let i = 0; i < 8; i++) { 
        let textoPregunta = prompt(`Ingrese el texto para la pregunta ${i + 1}:`);
        let opciones = [];
        for (let j = 0; j < 4; j++) {
            opciones.push(prompt(`Ingrese la opción ${j + 1} para la pregunta ${i + 1}:`));
        }
        let correcta = parseInt(prompt(`Ingrese el número de la opción correcta para la pregunta ${i + 1} (1-4):`), 10) - 1;
        preguntas.push({ texto: textoPregunta, opciones: opciones, correcta: correcta });
    }

    cuestionarios.push({ titulo: titulo, preguntas: preguntas });
    alert("El cuestionario ha sido creado satisfactoriamente.");

    let realizarCuestionario = parseInt(prompt("¿Desea realizar el cuestionario inmediatamente? (si=1, no=2)"), 10);
    if (realizarCuestionario === 1) {
        iniciarCuestionarioPorNumero();
    }
};

// Función para registrar un usuario
const registrarUsuario = () => {
    let nombreUsuario = prompt("Ingrese su nombre de usuario:");
    if (!usuarios.find(u => u.nombre === nombreUsuario)) {
        usuarios.push({ nombre: nombreUsuario, notas: [] });
    }
    return nombreUsuario;
};

// Función para responder un cuestionario
const responderCuestionario = (usuario, cuestionario) => {
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

    almacenarRespuestas(usuario, cuestionario, respuestas);
    mostrarResultados(usuario, cuestionario, respuestas);
    alert("Cuestionario completado satisfactoriamente.");
};

// Función para almacenar las respuestas de los cuestionarios
const almacenarRespuestas = (usuario, cuestionario, respuestas) => {
    if (!cuestionario.respuestas) {
        cuestionario.respuestas = [];
    }
    cuestionario.respuestas.push({ usuario: usuario, respuestas: respuestas });
};

// Función para mostrar los resultados del cuestionario
const mostrarResultados = (usuario, cuestionario, respuestas) => {
    let correctas = 0;
    cuestionario.preguntas.forEach((pregunta, preguntaIndex) => {
        if (respuestas[preguntaIndex] === pregunta.correcta) {
            correctas++;
        }
    });

    let nota = ((correctas / cuestionario.preguntas.length) * 100).toFixed(2);
    alert(`Resultados del cuestionario "${cuestionario.titulo}": \nCorrectas: ${correctas}/${cuestionario.preguntas.length}\nNota: ${nota}%\nGracias por responder el cuestionario, valoramos mucho su participación.`);
    console.log(`Nota: ${nota}%`);

    // Almacenar la nota del usuario
    let usuarioExistente = usuarios.find(u => u.nombre === usuario);
    if (usuarioExistente) {
        usuarioExistente.notas.push({ cuestionario: cuestionario.titulo, nota: nota });
    } else {
        usuarios.push({ nombre: usuario, notas: [{ cuestionario: cuestionario.titulo, nota: nota }] });
    }
};

// Función para mostrar los cuestionarios disponibles
const mostrarCuestionarios = () => {
    console.log("Cuestionarios disponibles:");
    cuestionarios.forEach((cuestionario, index) => {
        console.log(`${index + 1}. ${cuestionario.titulo}`);
    });
};

// Función para iniciar el cuestionario por número
const iniciarCuestionarioPorNumero = () => {
    let nombreUsuario = registrarUsuario();
    mostrarCuestionarios();
    let numeroCuestionario = parseInt(prompt("Ingrese el número del cuestionario que desea responder:"), 10) - 1;

    if (numeroCuestionario >= 0 && numeroCuestionario < cuestionarios.length) {
        let cuestionarioSeleccionado = cuestionarios[numeroCuestionario];
        responderCuestionario(nombreUsuario, cuestionarioSeleccionado);
    } else {
        console.log("Número de cuestionario no válido.");
    }
};

// Procedimiento principal
crearCuestionario();
