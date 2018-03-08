/* eslint-disable handle-callback-err */
'use strict'

const fs = require('fs')
let listFiles = ['Finish', 'Language', 'Profile', 'Steps', 'Structure']

function throwError(log = null) {
  return function(error) {
    if (error) throw error
    if (log) console.log(log)
  }
}

module.exports.SaveData = function saveData(file, data, current) {
  let selectFile = selectFileList(file, current)
  if (selectFile === '') return {}
  fs.writeFile(selectFile, JSON.stringify(data), error => {
    if (error) return error
    return 200
  })
}

module.exports.ReadData = function readData(file, current) {
  const selectFile = selectFileList(file, current)
  if (selectFile === '') return {}
  const content = fs.readFileSync(selectFile)
  return JSON.parse(content)
}

module.exports.CreateDir = function createdir(project) {
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

module.exports.RenameDir = function renamedir(oldName, newName) {
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
  listFiles.forEach(fileElement => {
    const path = `${origin}/Project${fileElement}.json`
    fs.unlink(path, throwError(`Delete: ${path}`))
  })
  fs.rmdir(origin)
  return response
}

module.exports.DeleteDir = function deletedir(name) {
  const destiny = '../data/' + name
  let response = -1
  if (!fs.existsSync(destiny)) return response

  listFiles.forEach(fileElement => {
    const path = `${destiny}/Project${fileElement}.json`
    fs.unlink(path, throwError(`Delete: ${path}`))
  })
  fs.rmdir(destiny)
  return 0
}

function capitalize(input) {
  return input[0].toUpperCase() + input.substring(1).toLowerCase()
}

function selectFileList(file, current) {
  const allowed = ['profile', 'language', 'steps', 'finish', 'structure'],
    isProject = file.toLowerCase() === 'project',
    isAllowed = allowed.includes(file.toLowerCase())

  if (isAllowed) return `../data/${current}/Project${capitalize(file)}.json`
  if (isProject) return '../data/ProjectList.json'
  return ''
}

module.exports.NewProject = function newProject(projectName) {
  let origen = '../data/' + projectName
  let destiny = '../final/' + projectName
  let language = ''
  language = JSON.parse(
    fs.readFileSync(origen + '/ProjectLanguage.json', (err, data) => {
      if (err) throw err
    })
  )
  // *********** verify no duplicate ********/
  let info = JSON.parse(
    fs.readFileSync('../final/ProjectList.json', (err, data) => {
      if (err) throw err
    })
  )
  const existold = info.projects.any(({ name }) => name === projectName)
  if (existold) return 404
  // ********* create directories ***********/
  if (!fs.existsSync(destiny)) {
    fs.mkdirSync(destiny, 0o755)
  }
  if (!fs.existsSync(destiny + '/data')) {
    fs.mkdirSync(destiny + '/data', 0o755)
  }
  language.language.push({
    name: 'English',
    short: 'en'
  })

  language.language
    .forEach(({ short }) => {
      const path = `${destiny}/data/${short}`
      if (!fs.existsSync(path)) fs.mkdirSync(path, 0o755)
    })

    [
      // ************* copiar archivos ***********
      ('/helper.vue', 'normalize.css', 'skeleton.css')
    ].forEach(x => {
      fs.copyFile('../final/basic' + x, destiny + x, throwError())
    })

  language.language.forEach(({ short }) => {
    ;['finish', 'profile', 'steps'].forEach(x => {
      fs.copyFile(
        `${origen}/Project${capitalize(x)}.json`,
        `${destiny}/data/${short}/${x}.json`,
        throwError()
      )
    })
  })

  fs.copyFile(
    origen + '/ProjectStructure.json',
    destiny + '/data/structure.json',
    throwError()
  )
  let temporallanguage = {
    language: language.language.map(({ name, short }) => ({ name, short }))
  }
  fs.writeFile(
    destiny + '/data/language.json',
    JSON.stringify(temporallanguage),
    function(error) {
      if (error) {
        return error
      }
    }
  )
  info.projects.push({
    name: projectName
  })
  fs.writeFile('../final/ProjectList.json', JSON.stringify(info), function(
    error
  ) {
    if (error) {
      return error
    }
  })
  let lineImports = ''
  let lineRoutes = ''
  let lineSemicolon = ''
  let limit = info.projects.length - 1
  info.projects.forEach(function(element, index) {
    lineImports += `import ${element.name} from './${element.name}/helper'\n`
    lineSemicolon = (index < limit ? ',' : '') + '\n'
    lineRoutes += `
        {
            path: '/${element.name}',
            name: '${element.name}',
            component: ${element.name}
        }${lineSemicolon}`
  })

  let content = `${lineImports}const routes = [
        ${lineRoutes}
    ]

    export default routes`

  fs.writeFile('../final/routeFront.js', content, function(error) {
    if (error) {
      return error
    }
  })
}
