## Producto final

El producto final no tiene dependencias por lo que es totalmente copiable a cualquier otro proyecto.

Todo el contenido esta en **src/final/nombredelproyecto**.

La carpeta contiene todo lo necesario para que el sistema funcione integrado a cualquier proyecto Vue.

Este es un ejemplo que trae el sistema.

![ejemploProyectoFinal](/Users/gonzalonandez/SarahGift/helper/images/ejemploProyectoFinal.png)

El componente es el centro del sistema, los css se incluyen pero la personalizacion esta contenida en el componente que es copiado siempre de **final/basic** por lo que si se van a hacer varios proyectos con una estetica diferente al actual el componente a modificar es **final/basic/helper.vue** y todos los proyectos futuros tendrán las modificaciones.

Dentro de data existen carpetas divididas por idiomas. Los idiomas se encuentran en **languaje.json** y la estructura de datos esta en **structure.json**

Brindamos un [scaffolding](https://github.com/Gonzalo2310/skeleton-help) para que se hagan las pruebas correspondientes.