'use strict';

// 1. Select the button
const backToTop = document.querySelector('back-to-top');

// 2. Set all attributes
const newArrwo =
  '<svg xmlns="http://www.w3.org/2000/svg" part="svg-tag" class="arrow-back-to-top" viewBox="0 0 320 512"><path d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192H96l0 288c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32l0-288h72c9.6 0 18.2-5.7 22-14.5z"/></svg>';

backToTop.setAttribute('preset', 'preset-4');
backToTop.setAttribute('new-arrow', newArrwo);
backToTop.setAttribute('color-icon', '#82e8f2');
backToTop.setAttribute('color-bg', '#239e1f');
backToTop.setAttribute('btn-padding', '20px');
backToTop.setAttribute('sm-btn-padding', '10px');

// IMPORTENT
// make sure that you have
// part="svg-tag" class="arrow-back-to-top"
// in the svg tag

// Notice:
// You can also set only single attributes.
// Use the attribute "preset" for this.

// In some cases, the order is important.
// In this case set "new-arrow" after "preset".
