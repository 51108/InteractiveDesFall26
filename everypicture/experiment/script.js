(function () {
    'use strict';

    const people = document.querySelectorAll('svg rect');
    const portrait = document.querySelector('#portrait');
    const whisper = document.querySelector('#whisper');

    // every rect in the SVG map gets two listeners:
    // mouse goes onto the person, mouse goes off the person hides it again
    for (const eachPerson of people) {
    eachPerson.addEventListener('mouseover', showPerson);
    eachPerson.addEventListener('mouseout', hidePerson);    }

    // event.target is the rect the mouse went onto,
    // so its id tells us who it is
    function showPerson(event) {
        const thisPerson = event.target.id;
        console.log(thisPerson);

        // switch: swap in that person's photo and write their likes and dislikes into the whisper
        switch (thisPerson) {
            case 'yovi':
                portrait.src = 'images/likes1-y.jpg';
                whisper.innerHTML = '<strong>Yovi</strong> Likes eating with tiny spoons and drawing on fogged-up glass. Dislikes chargers that only work at a certain angle, and her laptop overheating in a silent classroom.';
                break;
            case 'zosia':
                portrait.src = 'images/dislike1-z.jpg';
                whisper.innerHTML = '<strong>Zosia</strong> Likes being mistaken for a local when traveling and the smell of rain on pavement. Dislikes sticky price tags that leave residue, and the gap between the fridge and the counter where things fall forever.';
                break;
            case 'audrey':
                portrait.src = 'images/dislike1-a.jpg';
                whisper.innerHTML = '<strong>Audrey</strong> Likes crawling up the stairs on all fours and peeling tangerines in one piece. Dislikes the sound her laundry machine makes three-quarters of the way through, and having to eat without watching YouTube.';
                break;
        }

        // fade the photo and the text in
        portrait.className = 'showing';
        whisper.className = 'showing';
    }

    // back to the blurred crowd
    function hidePerson() {
        portrait.className = 'hidden';
        whisper.className = 'hidden';
    }

})();