let keys = document.querySelectorAll(".key");
let hiddenNameContainer = document.querySelector(".hidden-name-container")
let hangImage = document.querySelector(".hang-image")
let word = "dinode"
let selectedKey = ""
let isThereAtLeastOneLetter = false
let hangCharacterStep = 0
let hangCharacterImageSource = "/images/pendu_" + hangCharacterStep + ".jpg"
hangImage.src = hangCharacterImageSource



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
        checkLetters(selectedKey)
        isThereAtLeastOneLetter = false
    })
}

function checkLetters(key) {  //vérrifie si le mot caché contient la lettre cliquée
    console.log("function enabled")
    console.log(allHiddenLetters.length)
    for (let p = 0; p < allHiddenLetters.length; p++) {
        console.log("loop")
        if (allHiddenLetters[p].value === key) {
            isThereAtLeastOneLetter = true
            console.log(allHiddenLetters[p].value || key)
            allHiddenLetters[p].textContent = allHiddenLetters[p].value
        }

        else if (isThereAtLeastOneLetter === false) {       //il faut éviter que la boucle passe ici, le jeu détecte des erreurs même sur les bonnes réps
            console.log("false")
            hangCharacterStep++
            hangCharacterImageSource = "/images/pendu_" + hangCharacterStep + ".jpg"
            hangImage.src = hangCharacterImageSource
            hangImage.alt = "bonhomme pendu stage: " + hangCharacterStep
            if (hangCharacterStep >= 9) {
                hangImage.alt = "bonhomme pendu stage: " + "mort"
            }
        }
    }
}
