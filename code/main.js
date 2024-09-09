let keys = document.querySelectorAll(".key");
let hiddenNameContainer = document.querySelector(".hidden-name-container")
let allHiddenLetters = document.querySelectorAll(".hidden-letters")
let word = "bite"
let selectedKey = ""


for (let j = 0; j < word.length; j++) {  //créer les cases où sont cachées les lettres
    let hiddenLetter = document.createElement("div")

    hiddenLetter.classList.add("hidden-letters")
    hiddenLetter.value = word[j]
    console.log(hiddenLetter.value)

    hiddenNameContainer.appendChild(hiddenLetter)
}



function checkLetters(key) {
    console.log("function enabled")
    for (let p = 0; p < allHiddenLetters; p++) {
        console.log("loop")
        if (allHiddenLetters[p].value === key) {
            console.log(allHiddenLetters[i].value || key)
            allHiddenLetters[p].textContent = allHiddenLetters[p]
        }
        else {
            console.log("no")
        }
    }
}

for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", function () {
        selectedKey = keys[i].id
        console.log(selectedKey)
        checkLetters(selectedKey)
    })
}




