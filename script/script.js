console.log('Hey developers')

// fetch section----->

//1//all-button\\
const allBtn = () => {
    const url = ('https://openapi.programming-hero.com/api/levels/all')//promise of response
    fetch(url)//promise of response
        .then(res => res.json())//promise of json
        .then(data => displayLesson(data.data));//
}
//2//Button-infos
const loadLevelWord = (id) => {
    loadingSpin(true)
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive()
            const clickedBtn = document.getElementById(`lessonBtn-${id}`)
            clickedBtn.classList.add("active");
            displayLevelWord(data.data)
        })

}
// remove active
const removeActive = () => {
    document.querySelectorAll('.lesson-btn')
        .forEach(btn => btn.classList.remove('active'));
}
//3//loadDetail
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)

}
//loading icon
const loadingSpin = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    } else {
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('word-container').classList.remove('hidden')
    }
}
//3 to 4
const displayWordDetails = (word) => {
    // console.log(word);
    const detailsModal = document.getElementById('details-container')
    detailsModal.innerHTML =
        `
                <div class="">
                    <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold text-2xl">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold text-2xl">Example</h2>
                    <p>"${word.sentence}"</p>
                </div>
                <div class="">
                    <h2 class="font-bold text-2xl font-bangla">সমার্থক শব্দ গুলো</h2>
                    <span class="flex gap-3">
                        <button class="btn bg-green-200">${word.synonyms[0] ? word.synonyms[0] : '---'}</button><br>
                        <button class="btn bg-green-200">${word.synonyms[1] ? word.synonyms[1] : '---'}</button><br>
                        <button class="btn bg-green-200">${word.synonyms[2] ? word.synonyms[2] : '---'}</button>
                    </span>
                </div>
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary">Complete Learning</button>
                </form>
            `
    document.getElementById('myModal').showModal()

}


//machine section------>
//1//all-button\\
const displayLesson = (lessons) => {
    // console.log(lessons)
    //1//get the container & empty
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = "";
    //2//get into every lesson 
    for (let lesson of lessons) {
        console.log(lesson)
        //3//create element
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
 <button id="lessonBtn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary  lesson-btn" title="${lesson.lessonName}"><i class="fa-brands fa-leanpub"></i>Lesson-${lesson.level_no}</button>
 
 `;
        //4//append into container
        levelContainer.append(btnDiv);
    }

}

// Testing
// {
//     "id": 19,
//     "level": 1,
//     "word": "Sincere",
//     "meaning": "সত্‍ / আন্তরিক",
//     "pronunciation": "সিনসিয়ার"
// }
//2//Button-infos\\
const displayLevelWord = (words) => {
    // console.log(words)
    const wordContainer = document.getElementById('word-container')

    wordContainer.innerHTML = "";


    if (words.length == 0) {

        wordContainer.innerHTML = ` <div class="text-center  col-span-full font-bangla space-y-3">
                <i class="fa-solid fa-file-circle-exclamation text-6xl text-gray-400"></i>
                <p class="text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
            </div>`;
        loadingSpin(false)
        return;
    }

    //3//
    words.forEach(word => {
        // console.log(word);
        const cards = document.createElement('div');
        cards.innerHTML = `
        <div class=" bg-white rounded-md shadow-sm text-center py-10 px-5">
            <div class="space-y-3">
                <h2 class="text-3xl font-bold">${word.word ? word.word : "Not Found"}</h2>
                <p><small>Meaning /Pronounciation</small></p>
                <p class="text-2xl font-bold  font-bangla" >${word.meaning ? word.meaning : "Not Found"}/${word.pronunciation ? word.pronunciation : "Not Found"}"</p>
            </div>
            <div class="flex justify-around items-center pt-10">
                <button onclick="loadWordDetail(${word.id})" class="btn btn-square bg-blue-50 bg-opacity-10 hover:bg-blue-700 hover:text-white"><i class="fa-solid fa-circle-info"></i></button>

                 <button class="btn btn-square speak-btn bg-blue-50 bg-opacity-10 hover:bg-blue-700 hover:text-white">
                <i class="fa-solid fa-ear-listen"></i>
                </button>
            </div>
        </div>
        `;
        // and up there have to change the speak button 
        // SPEAK BUTTON  change here to speek********Event Listener Add
        cards.querySelector(".speak-btn")
            .addEventListener("click", () => {
                speakWord(word.word);
            });
        wordContainer.append(cards)
    })
    loadingSpin(false)
}
//default page
const defaultPage = () => {
    const selectLesson = document.getElementById('word-container')
    selectLesson.innerHTML = `<div class="text-center  col-span-full font-bangla space-y-3">
                <i class="fa-solid fa-arrow-pointer text-6xl text-gray-400"></i>
               
                <p class="text-gray-400">ইংলিশ শেখা হোক পছন্দ মতো </p>
                <h2 class="font-bold text-3xl">একটি লেসন বাছাই করুন </h2>
            </div>`;

}




document.getElementById('btn-search').addEventListener("click", () => {
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    // console.log(searchValue);
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(search => {
            const allWords = search.data;
            // console.log(allWords);
            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
            // console.log(filterWords);
            displayLevelWord(filterWords)


        })
});

document.getElementById('copyRightDate').innerText =
    `© ${new Date().getFullYear()} Your Company. All rights reserved.`;


//  SPEAK FUNCTION 
function speakWord(word) {

    if (!word) return;

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(word)

    utterance.lang = "en-US"
    utterance.rate = 0.9
    utterance.pitch = 1

    window.speechSynthesis.speak(utterance)
}

allBtn()
defaultPage()

