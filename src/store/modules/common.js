export function catchHandling (response) {
  if (response.data) {
    console.error(response.data.error)
  } else {
    console.log(response)
  }
}

export function handlePromise (commitName) {
  return function (commit, targetPromise, commitableValue) {
    targetPromise
    .then(_ => {
      commit(commitName, commitableValue)
    })
    .catch(catchHandling)
  }
}
