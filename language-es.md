# Configuración de Idioma

No se ha utilizado ningun componente ni libreria extra para manejar el idioma por varias razones

* El sistema de creacion es bastante liviano con poco texto por lo que usar algo externo era una sobrecarga innecesaria
* Aprendizaje. El idioma es un tema bastante recurrente y controlar el funcionamiento da un conocimiento importante y este proyecto era de aprendizaje.
* El producto final debia ser muy liviano y lo mas portable posible, asi que si se podia hacer algo manual mas sencillo se llegaria mejor a ese objetivo.

El sistema tiene 3 niveles de idiomas.

* **Admin** -> Es la parte de administración, donde se puede crear y administrar los proyectos.
* **Proyectos en evolución** -> Son los proyectos que estan procesandose.
* **Proyectos finales** -> Son los proyectos finales y terminados. Son aquellos que ya son portables.

### Admin

Se configura en el archivo **src/store/languageSystem.js**.

Los idiomas se agregan al array: 

* ```json
  availableSystemLanguage: ['es', 'en']
  ```

Y los archivos de idiomas se encuentran en: 

* **src/language/{idioma}/messages.js**

La forma de agregar un idioma es:

* Agregar las dos letras del idioma al array
* Crear una carpeta con las mismas dos letras dentro de **src/language/**
* Copiar en la carpeta **messages.js** desde **src/language/en/messages.js**
* Editar y modificar el archivo copiado.

El sistema de idioma se maneja por medio del store



## Proyectos en evolución

Los proyectos en evolución se pueden (y es la postura recomendada) controlar desde el Admin:

![languages](/Users/gonzalonandez/SarahGift/helper/images/languages.png)

Y manualmente se puede modificar el archivo **src/data/nombreproyecto/ProjectLanguage.json** usando el siguiente formato:

```json
{
  "selected": false,
  "name": "English", // nombre del idioma
  "short": "en" // letras del idioma (tambien es nombre de la carpeta con los archivos)
}
```

El sistema de idiomas de los proyectos en evolucion no permite traduccion por ahora.

## Proyectos finalizados

Los proyectos terminados están contenidos en src/final/nombredelproyecto.

Para agregar idiomas aqui se debe hacer de la siguiente manera:

* Editar el archivo **language.json**
* Agregar idioma utilizando el formato:

```json
{
  "name": "Bulgarian", // nombre del idioma
  "short": "bg" // letras del idioma (tambien es nombre de la carpeta con los archivos)
}
```

* Dentro de la carpeta del proyecto **/data/{letrasdelidioma}/**
* Copiar archivos desde **/data/en/**
* Editarlos y modificar el contenido.

El sistema de traducción utiliza el import dinamico contenido en el componente **helper.vue** final

