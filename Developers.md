## Development

#### Administration System

When creating the system, an attempt was made to think about easy-to-use options, so a data management system was chosen through files in database logging.

It's not that the system is better at handling file data rather than a database but any db needs an additional deployment that has been deemed excessive for the idea of this product.

To make this possible, an internal server has been created to manage the files and their data.

The server resides in **src/internalServer**. This server has a main file `server.js` that manages an api with internal paths for file management and operations.

All file management code resides in `src/functions/fileJobs.js` and is used exclusively by the api.

This internal server has the following dependencies: 

* body-parser
* cors
* express
* nodemon

These are configured in `package.json` on **src/internalServer** and are installed according to the `README.md` instructions.

The rest of the folders used are structured as follows:

* **src/App.vue** -> Main component. Typical of any vue-cli project
* **src/main.js** -> It is the main JS file, import App.vue, Element-ui (components and aesthetics), css file of the project. Router for routes and store (Vuex).
* **src/personalStyle.css** -> set of basic css rules for the administration part
* **src/store** -> All Vuex content is here. For a better management of the information we have created a module inside the folder `./modules` and inside there is a folder `./fileApi` where the Vuex code that involves the files resides. 
* **src/router** -> Contains the program paths. This is a typical path file instead of `import route from'... /final/routeFront'` which loads a file that when a project is created is overwritten and creates dynamic routes for the front adding new projects.
* **src/language** -> contains the administration messages in different languages separated by folders
* **/src/components** -> contains the components for program operation
  * `admin.vue` -> Admin administration menu system and admin routes
  * `createProject.vue` -> very basic component for the last stage of final project creation.
  * `finish.vue` -> Manage the active project's finish elements (system elements are described in `README.md`)
  * `language.vue` -> Manage project languages.
  * `listProject.vue` -> Manage the list of projects.
  * `profile.vue` -> Manage project profile data.
  * `step.vue` -> Manage the steps elements (the system elements are described in `README.md`)
  * `structure.vue` -> Manage the tree-shaped relationship between the contents (the system elements are described in `README.md`)
  * `tableSpecial.vue` -> Special table developed to facilitate the creation of contents in the form of a list
* **src/Data** -> Contains a list of projects that are being developed and their data. 
  * `ProjectList.json` -> Maintains the list of projects

  The information of each project is separated by the project name and the files contained in it. Each is created by copying the **/src/data/default** information so any changes to those files will affect future creations.

* **src/final** -> Contains the completed project. Everything needed to make it work is in a folder with the name of the project and can be copied to any other project because it has no dependencies. Just respect the name of the files and folders contained.