/* eslint-disable handle-callback-err */
'use strict'
const fs = require('fs')
const listFiles = ['Finish', 'Language', 'Profile', 'Steps', 'Structure']

function capitalize (input) {
  return input[0].toUpperCase() + input.substring(1).toLowerCase()
}

function selectFileList (file, current) {
  const allowed = listFiles.map(x => x.toLowerCase())
  const isProject = file.toLowerCase() === 'project'
  const isAllowed = allowed.includes(file.toLowerCase())

  if (isAllowed) return `../data/${current}/Project${capitalize(file)}.json`
  if (isProject) return '../data/ProjectList.json'
  return ''
}

function throwError (log = null) {
  return function (error, data = null) {
    if (error) throw error
    if (log) console.log(log)
  }
}

function returnError (returnValue = null) {
  return function (error) {
    if (error) return error
    if (returnValue) return returnValue
  }
}

function unlinkListFiles (listFiles, origin) {
  listFiles.forEach(file => {
    const path = `${origin}/Project${file}.json`
    fs.unlink(path, throwError(`Delete: ${path}`))
  })
}

function parseComponentFromName (name, trailingComma = false) {
  return `{
      path: '/${name}',
      name: '${name}',
      component: ${name}
    }${trailingComma ? ',' : ''}`
}

function parseImportsAndRoutes (imports, routes) {
  return `${imports.join('\n')}

const routes =
  [
    ${routes.join(' ')}
  ]

export default routes\n`
}

function makeImportsAndRoutesFromProject (options) {
  return function (acc, {name}, index) {
    acc.lineImports.push(`import ${name} from './${name}/helper'`)
    acc.lineRoutes.push(parseComponentFromName(name, index < options.limit))
    return acc
  }
}

module.exports.SaveData = function saveData (file, data, current) {
  let selectFile = selectFileList(file, current)
  if (selectFile === '') return {}
  fs.writeFile(selectFile, JSON.stringify(data), returnError(200))
}

module.exports.ReadData = function readData (file, current) {
  const selectFile = selectFileList(file, current)
  if (selectFile === '') return {}
  const content = fs.readFileSync(selectFile)
  return JSON.parse(content)
}

module.exports.CreateDir = function createdir (project) {
  const target = '../data/' + project
  let response = -1
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, 0o755)
    response = fs.existsSync(target) ? 0 : -1
  }
  if (response === 0) {
    listFiles.forEach(fileElement => {
      fs.copyFile(
        `../data/default/Project${fileElement}.json`,
        `${target}/Project${fileElement}.json`,
        throwError()
      )
    })
  }
  return response
}

module.exports.RenameDir = function renamedir (oldName, newName) {
  const origin = '../data/' + oldName
  const destiny = '../data/' + newName
  let response = -1
  if (!fs.existsSync(destiny)) {
    fs.mkdirSync(destiny, 0o755)
    response = fs.existsSync(destiny) ? 0 : -1
  }
  listFiles.forEach(fileElement => {
    fs.copyFile(
      `${origin}/Project${fileElement}.json`,
      `${destiny}/Project${fileElement}.json`,
      throwError()
    )
  })
  unlinkListFiles(listFiles, origin)
  fs.rmdir(origin)
  return response
}

module.exports.DeleteDir = function deletedir (name) {
  const destiny = '../data/' + name
  if (!fs.existsSync(destiny)) return -1

  unlinkListFiles(listFiles, destiny)
  fs.rmdir(destiny)
  return 0
}

module.exports.NewProject = function newProject (projectName) {
  let origen = '../data/' + projectName
  let destiny = '../final/' + projectName
  let language = ''
  language = JSON.parse(
    fs.readFileSync(origen + '/ProjectLanguage.json', throwError())
  )
  // *********** verify no duplicate ********/
  let info = JSON.parse(
    fs.readFileSync('../final/ProjectList.json', throwError())
  )

  const existold = info.projects.some(({name}) => name === projectName)
  if (existold) return 404
  // ********* create directories ***********/
  if (!fs.existsSync(destiny)) fs.mkdirSync(destiny, 0o755)
  if (!fs.existsSync(destiny + '/data')) fs.mkdirSync(destiny + '/data', 0o755)
  language.language.push({name: 'English', short: 'en'})

  // ************* copiar archivos ***********
  language.language.forEach(({short}) => {
    const path = `${destiny}/data/${short}`
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, 0o755)
    }
    ['finish', 'profile', 'steps'].forEach(x => {
      fs.copyFile(
        `${origen}/Project${capitalize(x)}.json`,
        `${destiny}/data/${short}/${x}.json`,
        throwError()
      )
    })
  })

  const cssFile = ['/helper.vue', '/normalize.css', '/skeleton.css']
  cssFile.forEach(x => {
    fs.copyFile('../final/basic' + x, destiny + x, throwError())
  })

  fs.copyFile(
    origen + '/ProjectStructure.json',
    destiny + '/data/structure.json',
    throwError()
  )
  const temporallanguage = JSON.stringify({
    language: language.language.map(({name, short}) => ({name, short}))
  })
  fs.writeFile(destiny + '/data/language.json', temporallanguage, returnError())
  info.projects.push({name: projectName})
  fs.writeFile('../final/ProjectList.json', JSON.stringify(info), returnError())
  const {lineImports, lineRoutes} = info.projects.reduce(
    makeImportsAndRoutesFromProject({limit: info.projects.length - 1}),
    {lineImports: [], lineRoutes: []}
  )

  const content = parseImportsAndRoutes(lineImports, lineRoutes)
  fs.writeFile('../final/routeFront.js', content, returnError())
}
