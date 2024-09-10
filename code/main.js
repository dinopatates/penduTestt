const wonScreen = document.querySelector(".won")
const lostScreen = document.querySelector(".lost")

let keys = document.querySelectorAll(".key");
let hiddenNameContainer = document.querySelector(".hidden-name-container")
let hangImage = document.querySelector(".hang-image")
let selectedKey = ""
let isThereAtLeastOneLetter = false
let hangCharacterStep = 0
let clicked = true
let hangCharacterImageSource = "/images/pendu_" + hangCharacterStep + ".jpg"
hangImage.src = hangCharacterImageSource
let key;
let numberOfAnswer = 0
let answer = document.createElement("p")

const url = 'https://randomuser.me/api/?nat=fr&inc=name';

fetch(url, {
    method: 'GET',
    headers: {
    }
})
    .then(response => {
        if (response.ok) {
            return response.json();
        }

    })
    .then(data => {
        console.log(data);
        let word = data.results[0].name.first
        console.log(word)
        word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        word = word.toLowerCase()
        answer.textContent = "La réponse était: " + word

        for (let j = 0; j < word.length; j++) {  //créer les cases où sont cachées les lettres
            let hiddenLetter = document.createElement("div")

            hiddenLetter.classList.add("hidden-letters")
            hiddenLetter.value = word[j]
            console.log(hiddenLetter.value)

            hiddenNameContainer.appendChild(hiddenLetter)
        }

        let allHiddenLetters = document.querySelectorAll(".hidden-letters")

        for (let i = 0; i < keys.length; i++) {
            keys[i].addEventListener("click", function () {
                selectedKey = keys[i].id
                console.log(selectedKey)
                checkLetters(selectedKey, i)
                isThereAtLeastOneLetter = false
                keys[i].classList.add("disabled-key")
            })
        }


        function checkLetters(key, y) {  //vérrifie si le mot caché contient la lettre cliquée
            key = keys[y];
            console.log(key)
            console.log("function enabled")
            console.log(allHiddenLetters.length)
            if (word.includes(selectedKey)) {
                console.log("good")
                isThereAtLeastOneLetter = true
                for (let i = 0; i < allHiddenLetters.length; i++) {
                    if (allHiddenLetters[i].value === key.id) {
                        allHiddenLetters[i].textContent = allHiddenLetters[i].value
                        numberOfAnswer += 1
                        console.log("answer length:" + numberOfAnswer)
                        if (numberOfAnswer >= allHiddenLetters.length) {
                            wonScreen.classList.remove("hidden")
                        }
                    }
                }
            }
            else { //avance le stage du bonhomme pendu quand il y a une faute
                if (key.classList.contains('disabled-key')) {
                    return null
                }
                hangCharacterStep++
                hangCharacterImageSource = "/images/pendu_" + hangCharacterStep + ".jpg"
                hangImage.src = hangCharacterImageSource
                hangImage.alt = "bonhomme pendu stage: " + hangCharacterStep
                if (hangCharacterStep >= 9) {
                    hangImage.alt = "bonhomme pendu stage: " + "mort"
                    lostScreen.classList.remove("hidden")
                    lostScreen.appendChild(answer)
                    answer.classList.add("answer")
                }
            }
        }


    })
    .catch(error => {
        console.error('Erreur :', error);
    });