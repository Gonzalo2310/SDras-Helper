# Language Settings

No extra components or libraries have been used to handle the language for several reasons

* The creation system is quite lightweight with little text so using something external was an unnecessary overload.
* Learning. Language is a fairly recurrent subject and controlling the performance gives an important knowledge and this project was learning.
* The final product had to be very light and as portable as possible, so if you could do something more simple manual it would be better to reach that goal.

#### The system has 3 language levels.

* **Admin** -> This is the administration part, where you can create and manage projects.
* **Projects in progress** -> These are the projects being processed.
* **Final Projects** -> These are the final and finished projects. They are those that are already portable.



## Admin

It is configured in the **src/store/languageSystem.js** file.

Languages are added to the array: 

* ```json
  availableSystemLanguage: ['es', 'en']
  ```

And the language files are located in: 

* **src/language/{language}/messages.js**

The way to add a language is:

* Add the two letters of the language to the array
* Create a folder with the same two letters inside **src/language/**
* Copy to the **messages.js** folder from **src/language/en/messages.js**
* Edit and modify the copied file.

The language system is operated via the store



## Projects in progress

Evolving projects can be (and should be) controlled from Admin:

![languages](/Users/gonzalonandez/SarahGift/helper/images/languages.png)

And you can manually modify the **src/data/projectname/ProjectLanguage.json** file using the following format:

```json
{
  "selected": false,
  "name": "English", // name of the language
  "short: "en" // letters of the language (also the folder name with the files)
}
```

The language system of the evolving projects does not allow translation for now.

## Completed projects

The completed projects are contained in **src/en/project name**.

To add languages here you must do the following:

* Edit the **language.json** file
* Add language using the formatting:

```json
{
  "name": "Bulgarian", // language name
  "short: "bg" // letters of the language (also the name of the folder with the files)
}
```

* Within the **/data/{languageletters}/** project folder
* Copy files from **/data/en/**
* Edit them and modify the content.

The translation system uses the dynamic import contained in the **helper.vue** final component
