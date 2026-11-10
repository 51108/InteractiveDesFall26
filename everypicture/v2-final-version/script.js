(function () {
    'use strict';
    console.log('reading js');

    // wait for images to load so the section heights are right
    window.addEventListener('load', function () {
        const sections = document.querySelectorAll('section');
        const crowdPhoto = document.querySelector('#crowd-photo');
        const cards = document.querySelectorAll('.profile article');
        let sectionTops = [];
        let pagetop;
        let counter = 1;
        let prevCounter = 1;
        let doneResizing;

        // zoom class for each section (0 is empty because counter starts at 1)
        const zoomClasses = [
            '',
            'crowd', // 1. title
            'yovi', // 2. zoom in
            'yovi', // 3. card
            'crowd', // 4. zoom out
            'zosia', // 5
            'zosia', // 6
            'crowd', // 7
            'audrey', // 8
            'audrey', // 9
            'crowd', // 10
            'eleanor', // 11
            'eleanor', // 12
            'crowd' // 13. ending
        ];

        resetPagePosition();

        window.addEventListener('scroll', function () {
            // middle of the screen
            pagetop = window.scrollY + window.innerHeight / 2;

            // while instead of if so big jumps still catch up
            while (pagetop > sectionTops[counter]) {
                counter++;
                console.log(`scrolling down ${counter}`);
            }
            while (counter > 1 && pagetop < sectionTops[counter - 1]) {
                counter--;
                console.log(`scrolling up ${counter}`);
            }

            // only update when the section changes
            if (counter != prevCounter) {
                onSectionChange();
                prevCounter = counter;
            }
        });

        // re-measure after resizing is done
        window.addEventListener('resize', function () {
            clearTimeout(doneResizing);
            doneResizing = setTimeout(function () {
                resetPagePosition();
            }, 500);
        });

        function onSectionChange() {
            // zoom in or out
            crowdPhoto.className = zoomClasses[counter];

            // hide all cards, then show the one for this section
            for (const eachCard of cards) {
                eachCard.className = 'offscreen';
            }

            switch (counter) {
                case 3: cards[0].className = 'onscreen'; break;
                case 6: cards[1].className = 'onscreen'; break;
                case 9: cards[2].className = 'onscreen'; break;
                case 12: cards[3].className = 'onscreen'; break;
            }
        }

        // find where each section starts and which one is showing
        function resetPagePosition() {
            sectionTops = [];
            sections.forEach(function (eachSection) {
                sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
            });

            const pagePosition = window.scrollY + window.innerHeight / 2;
            counter = 0;
            sectionTops.forEach(function (eachSection) {
                if (pagePosition > eachSection) { counter++; }
            });
            console.log(`counter is now ${counter}`);

            onSectionChange();
            prevCounter = counter;
        }
    });

})();
