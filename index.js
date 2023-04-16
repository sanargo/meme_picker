import { catsData } from "./data.js"

const emotionRadios = document.querySelector("#emotion-radios")
const getImageBtn = document.querySelector("#get-image-btn")
const gifsOnlyOption = document.querySelector("#gifs-only-option")
const memeModalInner = document.querySelector('#meme-modal-inner')
const memeModal = document.querySelector('#meme-modal')
const memeModalCloseBtn = document.querySelector("#meme-modal-close-btn")

emotionRadios.addEventListener('change', highlightCheckedOption)
getImageBtn.addEventListener("click", renderCat)
memeModalCloseBtn.addEventListener("click", closeModal)

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName("radio")
    for (let emotion of radios) {
        emotion.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function renderCat() {
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
    <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
    >
    `
    memeModal.style.display = "flex"
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }  

}

function getMatchingCatsArray() {
    if (document.querySelector("input[type=radio]:checked")) {
        const selectedEmotion = document.querySelector("input[type=radio]:checked").value
        const isGift = gifsOnlyOption.checked

        const matchingCatArray = catsData.filter(function(cat) {
            if (isGift) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif 
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatArray;
    }
}

function closeModal() {
    memeModal.style.display = "none"
}

function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats)
    let radioItems = ""
    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input 
                type="radio" 
                id="${emotion}" 
                value="${emotion}"
                name="emotions">
        </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)