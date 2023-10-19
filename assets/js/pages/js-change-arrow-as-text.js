'use strict';

// 1. Select the button
const backToTop = document.querySelector('back-to-top');

// 2. Set all attributes
backToTop.setAttribute('new-text', "<div class='arrow-back-to-top' part='svg-tag'>Top</div>");
backToTop.setAttribute('height-icon', '30px');
backToTop.setAttribute('color-icon', '#ffffff');
backToTop.setAttribute('height-top', '200');
backToTop.setAttribute('color-bg', '#a81717c9');
backToTop.setAttribute('btn-bottom', '40px');
backToTop.setAttribute('btn-right', '40px');
backToTop.setAttribute('border-radius', '4px');
backToTop.setAttribute('btn-padding', '10px 12px');
backToTop.setAttribute('sm-width', '600px');
backToTop.setAttribute('sm-height-icon', '20px');
backToTop.setAttribute('sm-btn-bottom', '20px');
backToTop.setAttribute('sm-btn-right', '20px');
backToTop.setAttribute('sm-btn-padding', '8px 6px');

// IMPORTENT
// make sure that you have
// part="svg-tag" class="arrow-back-to-top"
// in the div tag

// Notice:
// You can also set only single attributes.
// Use the attribute "preset" for this.

// In some cases, the order is important.
// In this case, set the "new-text" attribute first.
// If is set "preset" set "new-text" after "preset".
