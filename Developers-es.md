## Desarrollo

### Sistema Administración

Al crear el sistema se ha intentado pensar en opciones facil de usar por lo que se ha optado por un sistema de manejo de datos a traves de archivos en logar de bases de datos.

No es que el sistema sea mejor manejando datos de archivos en lugar de una base de datos pero cualquier db necesita un despliegue adicional quese ha considerado excesivo para la idea de este producto.

Para hacer esto posible se ha creado un servidor interno para el manejo de los archivos y sus datos.

El servidor reside en **src/internalServer**. Este servidor cuenta con una archivo principal **server.js** que administra una api con rutas internas para el manejo de los archivos y las operaciones.

Todo el codigo de manejo de archivos reside en **src/functions/fileJobs.js** y es utilizado exclusivamente por la api.

Este servidor interno tiene las siguientes dependencias: 

* *body-parser*
* *cors*
* *express*
* *nodemon*

Estas estan configuradas en *package.json* en **src/internalServer** y se instalan segun las instrucciones del `README-es.md`

El resto de las carpetas utilizadas estan estructuradas de la siguiente manera:

* **src/App.vue** -> Componente principal. Tipico de cualquier proyecto vue-cli

* **src/main.js** -> Es el archivo JS principal, importa App.vue, Element-ui (componentes y estetica), archivo css del proyecto. Router para las rutas y store (Vuex).

* **src/personalStyle.css** -> conjunto de reglas css basicas para la parte de administracion

* **src/store** -> Todo el contenido de Vuex esta aqui. Para un mejor manejo de la informacion se han creado modulo dentro de la carpeta ./modules y dentro existe la carpeta ./fileApi que es donde reside el codigo de Vuex qe involucra los archivos. 

* **src/router** ->  Contiene las rutas del programa. Es un archivo típico de rutas en vue de no ser por `import route from '../final/routeFront'`que carga un archivo que cuando se crea un proyecto se sobreescribe y crea rutas dinamicas para el front agregando los proyectos nuevos

* **src/language** -> contiene los mensajes de la administracion en diferentes idiomas separados por carpetas

* **/src/components** -> contiene los componentes para el funcionamiento del programa
  * `admin.vue` -> Sistema de menu de administración y rutas de admin
  * `createProject.vue` -> componente muy basico para el ultimo paso de creacion del proyecto final.
  * `finish.vue` -> Administra los elementos finish del proyecto activo (los elementos del sistema se describen en README-es.md)
  * `language.vue` -> Administra los idiomas del proyecto.
  * `listProject.vue` -> Administra la lista de proyectos.
  * `profile.vue` -> Administra los datos de perfil del proyecto.
  * `steps.vue` -> Administra los elementos steps (los elementos del sistema se describen en **README-es.md**)
  * `structure.vue` -> Administra la relacion en forma de arbol entre los contenidos (los elementos del sistema se describen en **README-es.md**)
  * `tableSpecial.vue` -> Tabla especial desarrollada para facilitar la creacion de contenidos en forma de listado

 * ​ **/src/data** -> Contiene una lista de proyectos que se estan elaborando y sus datos. 

    * `ProjectList.json` -> Mantiene la lista de proyectos

   La informacion de cada proyecto esta separada por el nombre del proyecto y los archivos contenidos en el. Cada uno se crea copiando la informacion de **/src/data/default** por lo que cualquier cambio en esos archivos afectara las creaciones futuras

* **src/final** -> Contiene el proyecto finalizado. Todo lo necesario para que funcione esta dentro de una carpeta con el nombre del proyecto y puede ser copiado a cualquier otro proyecto porque no tiene dependencias. Solo hay que respetar el nombre de los archivos y carpetas contenidas.

