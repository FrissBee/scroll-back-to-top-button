# Scroll Back to Top Button

A button to scroll back to the top of a web page.

The button is easy to integrate and can be designed according to your own ideas. With the 4 presets you get a result quickly.

## Instruction

### Preview

1. Clone or download the repo.
2. Open the `index.html` file.
3. See all the possibilities and results in the subpages.
4. Resize the browser window to see the responsive design.
5. **Go to the files for more information and to see the source code.**

### Implementation

1. Implement the `back-to-top_1.0.0.js` file in your project
2. Implement the `<back-to-top></back-to-top>` HTML tag
3. For the design use the attributes

The `<back-to-top></back-to-top>` HTML tag can be inserted anywhere within the `body` tag.

## Example of implementation with the default settings

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Title</title>

    <!-- 1. Implementation of the "back-to-top_1.0.0.js" file -->
    <script src="./assets/js/back-to-top_1.0.0.js"></script>
  </head>
  <body>
    <!-- Some Content -->

    <!-- 2. Implementation of the "<back-to-top>" HTML tag -->
    <back-to-top></back-to-top>

    <!-- Some Content -->
  </body>
</html>
```

## All attributes

The following attributes are available for the button design:

- `preset` => There are 4 presets: `preset-1` (default), `preset-2`, `preset-3` und `preset-4`.
- `btn-center` => Places the button in the center of the page. In this case, do not set the `btn-right` attribute.
- `height-top` => Height from the top of the page when the button should be displayed. Defaullt: `400`.
- `color-bg` => Background color of the button.
- `arrow-icon` => There are 4 diffrent arrows: `arrow-1`, `arrow-2`, `arrow-3` und `arrow-4`.
- `color-icon` => Color of the arrow or the text if set `new-text`.
- `height-icon` => Height of the arrow or text if set `new-text`.
- `btn-bottom` => Distance of the button from the bottom of the page.
- `btn-right` => Distance of the button from the right of the page.
- `border-radius` => Border Radius of the Button.
- `btn-padding` => Inside distance of the button.
- `sm-width` => Size, from when the button should be adjusted for a smaller screen.
- `sm-height-icon` => Height of the arrow or text for a small screen.
- `sm-btn-bottom` => Distance of the button from the bottom of the page for a small screen.
- `sm-btn-right` => Distance of the button from the right of the page for a small screen.
- `sm-btn-padding` => Inside distance of the button for a small screen.
- `new-arrow` => Set your own arrow as svg.
- `new-text` => To display a text instead of an arrow.

For example:

```html
<back-to-top preset="preset-3" btn-center="center"></back-to-top>
```

### Notice:

Some attributes should not be used together. For example, the attribute "btn-center" should not be set with the attributes "btn-right" and "sm-btn-right". It just doesn't make sense to center the button and then give it a distance from the right.

If the attributes are set with JavaScript, the order is important in some cases.

## Settings of the default button

```html
<back-to-top
  color-bg="rgba(116, 116, 116, 0.3)"
  color-icon="rgb(250, 250, 250)"
  height-icon="3rem"
  arrow-icon="arrow-1"
  btn-bottom="40px"
  btn-right="40px"
  border-radius="4px"
  btn-padding="6px 10px 4px"
  sm-width="768px"
  sm-height-icon="2rem"
  sm-btn-bottom="10px"
  sm-btn-right="10px"
  sm-btn-padding="4px 10px 0"
></back-to-top>
```
