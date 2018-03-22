export function catchHandling (response) {
  if (response.data) {
    console.error(response.data.error)
  } else {
    console.log(response)
  }
}
