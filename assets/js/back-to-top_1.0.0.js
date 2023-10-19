'use strict';

(() => {
  const template = document.createElement('template');

  template.innerHTML = /* html */ `
    <style>
      .btn-container-center {
        display: flex;
        justify-content: center;
      }

      .is-visible {
        display: block;
      }

      .is-hidden {
        display: none;
      }

      .btn-back-to-top {
        position: fixed;
        cursor: pointer;
        border: none;
        outline: none;
      }

      .style-back-to-top {
        z-index: 99;
      }
    </style>
    
    <div class="btn-container">
      <button part="button-tag" class="btn-back-to-top style-back-to-top is-hidden">
      </button>
    </div>
  `;

  class BackToTop extends HTMLElement {
    #heightFromTop = 400;
    #root = null;
    #btnContainer = null;
    #btnBackToTop = null;
    #currentArrow = null;
    #arrows = {
      'arrow-1': `<svg xmlns="http://www.w3.org/2000/svg" part="svg-tag" class="arrow-back-to-top arrow-1" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>`,
      'arrow-2': `<svg xmlns="http://www.w3.org/2000/svg" part="svg-tag"  class="arrow-back-to-top arrow-2" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`,
      'arrow-3': `<svg xmlns="http://www.w3.org/2000/svg" part="svg-tag"  class="arrow-back-to-top arrow-3" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z"/></svg>`,
      'arrow-4': `<svg xmlns="http://www.w3.org/2000/svg" part="svg-tag"  class="arrow-back-to-top arrow-4" viewBox="0 0 320 512"><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>`,
    };

    #presets = {
      'preset-1': {
        btnBgColor: 'rgba(116, 116, 116, 0.3)',
        btnBorderRadius: '4px',
        btnBottom: '40px',
        btnRight: '40px',
        btnPadding: '6px 10px 4px',
        arrowIcon: this.#arrows[Object.keys(this.#arrows)[0]],
        arrowHeight: '3rem',
        arrowFill: 'rgb(250, 250, 250)',
        smWidth: '768px',
        smBtnBottom: '10px',
        smBtnRight: '10px',
        smBtnPadding: '4px 10px 0',
        smHeightIcon: '2rem',
      },
      'preset-2': {
        btnBgColor: 'rgba(230, 137, 40, 0.7)',
        btnBorderRadius: '4px',
        btnBottom: '40px',
        btnRight: '40px',
        btnPadding: '6px 20px 4px',
        arrowIcon: this.#arrows[Object.keys(this.#arrows)[1]],
        arrowHeight: '3rem',
        arrowFill: 'rgb(50, 50, 50)',
        smWidth: '768px',
        smBtnBottom: '10px',
        smBtnRight: '10px',
        smBtnPadding: '2px 10px 0',
        smHeightIcon: '1.8rem',
      },
      'preset-3': {
        btnBgColor: 'rgba(163, 27, 27, 1)',
        btnBorderRadius: '40px',
        btnBottom: '40px',
        btnRight: '40px',
        btnPadding: '7px 8px 3px 7px',
        arrowIcon: this.#arrows[Object.keys(this.#arrows)[2]],
        arrowHeight: '3.4rem',
        arrowFill: 'rgb(250, 250, 250)',
        smWidth: '768px',
        smBtnBottom: '10px',
        smBtnRight: '10px',
        smBtnPadding: '5px 4px 1px',
        smHeightIcon: '1.8rem',
      },
      'preset-4': {
        btnBgColor: 'rgba(116, 116, 116, 0.8)',
        btnBorderRadius: '8px',
        btnBottom: '40px',
        btnRight: '40px',
        btnPadding: '10px 18px 4px',
        arrowIcon: this.#arrows[Object.keys(this.#arrows)[3]],
        arrowHeight: '3rem',
        arrowFill: 'rgb(240, 240, 240)',
        smWidth: '768px',
        smBtnBottom: '10px',
        smBtnRight: '10px',
        smBtnPadding: '6px 12px 0',
        smHeightIcon: '2.4rem',
      },
    };
    #currentPreset = Object.keys(this.#presets)[0];
    withJs = false;

    constructor() {
      super();
      this.#root = this.attachShadow({ mode: 'closed' });
      this.#root.appendChild(template.content.cloneNode(true));
      this.#btnContainer = this.#root.querySelector('.btn-container');
      this.#btnBackToTop = this.#root.querySelector('button.btn-back-to-top');
    }

    static get observedAttributes() {
      return [
        'preset',
        'btn-center',
        'height-top',
        'color-bg',
        'color-icon',
        'arrow-icon',
        'height-icon',
        'btn-bottom',
        'btn-right',
        'border-radius',
        'btn-padding',
        'sm-width',
        'sm-height-icon',
        'sm-btn-bottom',
        'sm-btn-right',
        'sm-btn-padding',
        'new-arrow',
        'new-text',
      ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'preset' && Object.keys(this.#presets).includes(newValue)) {
        this.#currentPreset = newValue;
      }

      if (name === 'btn-center' && newValue === 'center') {
        this.#btnContainer.classList.add('btn-container-center');
        this.#presets[this.#currentPreset].btnRight = 'inherit';
      }

      if (name === 'height-top' && !isNaN(Number(newValue))) {
        this.#heightFromTop = Number(newValue);
      }
      // =============
      if (name === 'color-bg') {
        this.#presets[this.#currentPreset].btnBgColor = newValue;
      }

      if (name === 'color-icon') {
        this.#presets[this.#currentPreset].arrowFill = newValue;
      }

      if (name === 'arrow-icon' && Object.keys(this.#arrows).includes(this.getAttribute('arrow-icon'))) {
        this.#presets[this.#currentPreset].arrowIcon = this.#arrows[newValue];
      }

      if (name === 'height-icon') {
        this.#presets[this.#currentPreset].arrowHeight = newValue;
      }

      if (name === 'btn-bottom') {
        this.#presets[this.#currentPreset].btnBottom = newValue;
      }

      if (name === 'btn-right') {
        this.#presets[this.#currentPreset].btnRight = newValue;
      }

      if (name === 'border-radius') {
        this.#presets[this.#currentPreset].btnBorderRadius = newValue;
      }

      if (name === 'btn-padding') {
        this.#presets[this.#currentPreset].btnPadding = newValue;
      }

      if (name === 'sm-width') {
        this.#presets[this.#currentPreset].smWidth = newValue;
      }

      if (name === 'sm-height-icon') {
        this.#presets[this.#currentPreset].smHeightIcon = newValue;
      }

      if (name === 'sm-btn-bottom') {
        this.#presets[this.#currentPreset].smBtnBottom = newValue;
      }

      if (name === 'sm-btn-right') {
        this.#presets[this.#currentPreset].smBtnRight = newValue;
      }

      if (name === 'sm-btn-padding') {
        this.#presets[this.#currentPreset].smBtnPadding = newValue;
      }

      if (name === 'new-arrow') {
        this.#presets[this.#currentPreset].arrowIcon = newValue;
      }

      if (name === 'new-text') {
        this.#presets[this.#currentPreset].arrowIcon = newValue;
        this.#presets[this.#currentPreset].arrowHeight = '';
        this.#presets[this.#currentPreset].arrowFill = '';
        this.#presets[this.#currentPreset].smHeightIcon = '';
      }
    }

    connectedCallback() {
      this.#setAllSettings();
    }

    #setAllSettings() {
      this.#setSettings();
      const mediaMatch = window.matchMedia('(max-width: ' + this.#presets[this.#currentPreset].smWidth + ')');
      this.#setMediaMatch(mediaMatch);
      mediaMatch.addListener((e) => this.#setMediaMatch(mediaMatch));

      this.#btnBackToTop.addEventListener('click', this.#goBackToTop);
      window.onscroll = () => this.#showBackToTopBtn(this.#btnBackToTop, this.#heightFromTop);
    }

    #setSettings() {
      this.#btnBackToTop.innerHTML = this.#presets[this.#currentPreset].arrowIcon;
      this.#currentArrow = this.#root.querySelector('.arrow-back-to-top');
      this.#btnBackToTop.style.backgroundColor = this.#presets[this.#currentPreset].btnBgColor;
      this.#btnBackToTop.style.borderRadius = this.#presets[this.#currentPreset].btnBorderRadius;
      this.#currentArrow.style.fill = this.#presets[this.#currentPreset].arrowFill;
      this.#currentArrow.style.color = this.#presets[this.#currentPreset].arrowFill;
    }

    #setMediaMatch(mediaMatch) {
      if (mediaMatch.matches) {
        this.#btnBackToTop.style.bottom = this.#presets[this.#currentPreset].smBtnBottom;
        this.#btnBackToTop.style.padding = this.#presets[this.#currentPreset].smBtnPadding;

        if (this.hasAttribute('new-text')) {
          this.#currentArrow.style.fontSize = this.#presets[this.#currentPreset].smHeightIcon;
        } else {
          this.#currentArrow.style.height = this.#presets[this.#currentPreset].smHeightIcon;
        }

        if (this.hasAttribute('sm-btn-right')) {
          this.#btnBackToTop.style.right = this.getAttribute('sm-btn-right');
        } else if (this.hasAttribute('btn-center')) {
          this.#btnBackToTop.style.right = 'inherit';
        } else {
          this.#btnBackToTop.style.right = this.#presets[this.#currentPreset].smBtnRight;
        }
      } else {
        this.#btnBackToTop.style.bottom = this.#presets[this.#currentPreset].btnBottom;
        this.#btnBackToTop.style.padding = this.#presets[this.#currentPreset].btnPadding;

        if (this.hasAttribute('new-text')) {
          this.#currentArrow.style.fontSize = this.#presets[this.#currentPreset].arrowHeight;
        } else {
          this.#currentArrow.style.height = this.#presets[this.#currentPreset].arrowHeight;
        }

        if (this.hasAttribute('btn-right')) {
          this.#btnBackToTop.style.right = this.getAttribute('btn-right');
        } else if (this.hasAttribute('btn-center')) {
          this.#btnBackToTop.style.right = 'inherit';
        } else {
          this.#btnBackToTop.style.right = this.#presets[this.#currentPreset].btnRight;
        }
      }
    }

    #showBackToTopBtn(btnBackToTop, heightFromTop) {
      if (document.body.scrollTop > heightFromTop || document.documentElement.scrollTop > heightFromTop) {
        btnBackToTop.classList.add('is-visible');
        btnBackToTop.classList.remove('is-hidden');
      } else {
        btnBackToTop.classList.add('is-hidden');
        btnBackToTop.classList.remove('is-visible');
      }
    }

    #goBackToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  customElements.define('back-to-top', BackToTop);
})();
