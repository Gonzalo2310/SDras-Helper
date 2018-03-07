# Helper

#### Status: Alpha version

> Based on the idea of Sarah Drasner (@sdras). Sample Url of Sarah Drasner's creation: [JavaScript Array Explorer](https://codepen.io/sdras/full/gogVRX/). More information at history.md

## Idea

The main idea is to create a simple and intuitive help system. The system gives the tools to follow the format created by Sarah Drasner in her examples.

## Build Setup

Two terminals must be open to operate the system:
Terminal 1:

``` bash
# enter the internal file server
cd src
cd internalServer

# install dependencies
npm install

# serve file init in localhost:5000
npm start
```
Terminal 2:
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8000
npm run dev
```

## How it works

If instructions have been followed, the second terminal has launched the service at http://localhost:8000/#/

The system has two projects that we will talk about. To start creating, we must go to http://localhost:8000/#/admin

Starts in a menu of 7 options:

#### List of projects:

New projects are created here and can be deleted or renamed.
The name must be unique and have a single word.

#### Profile

Let's compare with the original project to understand what these fields are.

![profile example](images/profile.jpg)

Link to github is not yet developed.

#### Language

It contains extra languages for the project in addition to English. Only the corresponding folders and content relationships are created but there is no automatic translation.

In principle all content is in English and must be translated manually.

#### Before continuing

The system is divided into 3 elements.

**Step**: title and description. May have children

**Finish**: Contains various information and cannot contain children. It's the ultimate answer after several Steps.

**Structure**: Establishes in tree form the content relationships

#### Continuing with the Steps menu:

Each step has 3 fields: 

* **Name**: It must be unique and unrepeatable. It should not be translated. Not seen by the user

  The other two are explained graphically:

![Steps](images/steps.jpg)

Each step can contain as many steps or finish as you need. There is no limit to recursiveness.

It's only logical that I end up in a finish.

####  finish

Finish has several fields. 

* **Name**: Unique, unrepeatable. It cannot be translated. Not seen by the user

  The others we will see graphically

![finish](images/finish.jpg)

Finish can't have children.

#### Structure

It is where the order of presentation of the steps and finish created is established. A tree format is used for this.

#### Create project

This is the last phase in creating the project. About the product created and its dependencies read: ProyectDependencies.md

After the project has been created, you can access http://localhost:8000/#/ and access the list of created projects and use it.

To extract the created product to another project read: Extractfinalproduct.md

#### Developers

If you want to know more about the code or the internal process of the system read: Developers.md

#### Example and Default

The system brings an example based on Sarah Drasner's creation already finished and available for modification in `Admin` or its use of tests in `/`.

`Default` on the contrary is the basis of creations. Any change to default will be inherited by subsequent projects.