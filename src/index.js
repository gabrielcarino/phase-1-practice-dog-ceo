document.addEventListener('DOMContentLoaded', function () {

  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  let breeds = []

  fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => {
      data.message.forEach(dogImage => renderImage(dogImage))
  })

  fetch(breedUrl)
    .then(resp => resp.json())
    .then(data => {
      breeds = Object.keys(data.message)
      renderBreeds(breeds)
  })

  const dropdown = document.querySelector('#breed-dropdown')
  const ul = document.querySelector('#dog-breeds')

  dropdown.addEventListener('change', handleChange)

    function renderImage(dogImage) {
      const container = document.getElementById('dog-image-container')
      const img = document.createElement('img')
      img.src = dogImage
      container.append(img)
    }

    function renderBreeds(breeds) {
      breeds.forEach(breed => {
        let li = document.createElement('li')
        li.textContent = breed
        ul.append(li)
        li.addEventListener('click', changeColor)
      })
    }
    function changeColor(e) {
      e.target.style.color = "red"
    }

    function handleChange(e) {
      const letter = e.target.value
      filteredBreeds = breeds.filter(breed => breed.startsWith(letter))
      ul.innerHTML = ''
      renderBreeds(filteredBreeds)
    }
})