
# Proyecto 2: Sistema de votacion en JavaScript

# Descripcion:

Este proyecto permitira a los usuarios crear encuestas (cuestionarios), votar (responder), ver los resultados y obtener una nota aplicando comandos en terminal. Este programa creado con programacion funcional, se podrá ejecutar en el navegador, para visualizarse a través de la consola, enlazado a un archivo HTML. 
Esta herramienta resulta util para crear cuestionarios, registrar a los participantes, responder las preguntas y obtener una nota segun el desempeno.  



 

## Autor
Mauricio Baes Gutierrez

- mabaes.dwfs15@bootcampudd.cl
- baesmauricio@gmail.com



## Feedback

Si tienes alguna duda o si quieres contribuir a mejorar el codigo, por favor no dudes en contactarme. baesmauricio@gmail.com

## Proyecto 2: Demo

En este demo observaremos como se lleva a cabo la creacion de las funciones para crear los cuestionarios, registrar a los usuarios, responder las preguntas, almacenar las respuestas, mostrar los resultados, mostrar los cuestionarios disponibles, seleccionar e iniciar un cuestionario seleccionado. El proyecto fue realizado con el programa "JavaScript". 

A continuación, te explico el planteamiento, los requerimientos y la solución paso a paso. 

### Planteamiento
Un usuario requiere de un programa que le permita crear facilmente cuestionarios de 8 preguntas con 4 alternativas cada una. Adicionalmente nos solicita que los respondedores se registren para posteriormente obtener un arreglo con el nombre, el cuestionario respondido y su respectiva nota. El usuario nos enfatiza que la creacion del cuestionario y la interaccion con las preguntas sea fluida, clara y precisa por lo que privilegiamos el uso de la consola.

### Requerimientos

- Permitir a los usuarios crear cuestionarios con  8 preguntas de 4 opciones de respuesta.
- Permitir el registro de las personas que responderan las preguntas
- Permitir a los usuarios responder el cuestionario y obtener una retroalimentación (nota) una vez terminado el cuestionario.
- Almacenar los datos de las preguntas y las respuestas en una variable. 
- Implementar la solución utilizando programación funcional (PF).


### Solución explicada paso a paso

1. Primero,  creamos dos arreglo para almacenar los cuestionarios y el nombre de los usuarios. 
``` 
let cuestionarios = [];
let usuarios = [];

```

2. Luego creamos la función para crear los cuestionarios. Las preguntas y opciones quedaran guardadas en un arreglo.
```
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
```
3.  Creamos la función para registrar a los usuarios que responderan los cuestionarios.
```
const registrarUsuario = () => {
    let nombreUsuario = prompt("Ingrese su nombre de usuario:");
    if (!usuarios.find(u => u.nombre === nombreUsuario)) {
        usuarios.push({ nombre: nombreUsuario, notas: [] });
    }
    return nombreUsuario;
};
```
4. Creamos la función para responder el cuestionario.
```
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

```
5. Creamos la función para almacenar las respuestas de los cuestionarios.
```
const almacenarRespuestas = (usuario, cuestionario, respuestas) => {
    if (!cuestionario.respuestas) {
        cuestionario.respuestas = [];
    }
    cuestionario.respuestas.push({ usuario: usuario, respuestas: respuestas });
};
```
6. Creamos la función para mostrar los resultados del cuestionario y almacenamos cada una de las notas de los participantes.
```
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

    let usuarioExistente = usuarios.find(u => u.nombre === usuario);
    if (usuarioExistente) {
        usuarioExistente.notas.push({ cuestionario: cuestionario.titulo, nota: nota });
    } else {
        usuarios.push({ nombre: usuario, notas: [{ cuestionario: cuestionario.titulo, nota: nota }] });
    }
};
```
7.  Creamos una función para facilitar la selección de los cuestionarios disponibles.
```
const mostrarCuestionarios = () => {
    console.log("Cuestionarios disponibles:");
    cuestionarios.forEach((cuestionario, index) => {
        console.log(`${index + 1}. ${cuestionario.titulo}`);
    });
};

```

8. Adicionalmente, creamos una función para iniciar el cuestionario por numero asignado a cada cuestionario. 
```
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

```
9. Finalmente  establecimos algunas formas de interactuar desde la consola para facilitar el proceso

```
crearCuestionario();
iniciarCuestionarioPorNumero();
mostrarCuestionarios();
```

## 🚀 About Me

Mi nombre es Mauricio, kinesiologo intensivista, intelectualmente inquieto y con un profundo interes en mejorar los procesos asistenciales mediante la generacion de nuevo conocimiento. Apasionado por aquellas preguntas de investigacion que son relevantes para la institucion y los pacientes. Estoy convencido de que este Bootcamp UDD en desarrollo web contribuira a mejorar la gestión, los procesos de atención e inevitablemente la calidad de vida de los pacientes tanto a corto como a largo plazo. Sera una nueva forma de seguir contribuyendo a las salud de las personas. 