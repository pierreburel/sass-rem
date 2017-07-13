# Rem

Sass function and mixin to use rem units with optional pixel fallback.  

*Breaking change in 2.0*: `$rem-fallback` is now set to `false` ([see support](http://caniuse.com/#feat=rem)) and `$rem-baseline` to `16px` by default.  

Demo: [Sassmeister](http://sassmeister.com/gist/f75f0ffd0910a99eee77) / [Codepen](http://codepen.io/pierreburel/pen/ogGzgX)

Compatibility: [Sass](https://github.com/sass/sass) 3.2+ (3.3+ for maps) and [LibSass](https://github.com/sass/libsass).  

See also: https://github.com/pierreburel/sass-em

---

## Install

Download [`_rem.scss`](https://raw.githubusercontent.com/pierreburel/sass-rem/master/_rem.scss) or install with [Yarn](https://yarnpkg.com/), [npm](https://www.npmjs.com/) or [Bower](http://bower.io/):

* `yarn add sass-rem`
* `npm install sass-rem --save`
* `bower install sass-rem --save`

---

## Usage

Import `_rem.scss` and use the `rem` function.

### SCSS

```scss
@import "rem";

.demo {
  font-size: rem(24px); // Simple
  padding: rem(5px 10px); // Multiple values
  border-bottom: rem(1px solid black); // Multiple mixed values
  box-shadow: rem(0 0 2px #ccc, inset 0 0 5px #eee); // Comma-separated values
  text-shadow: rem(1px 1px) #eee, rem(-1px) 0 #eee; // Alternate use
}
```

### CSS

```css
.demo {
  font-size: 1.5rem;
  padding: 0.3125rem 0.625rem;
  border-bottom: 0.0625rem solid black;
  box-shadow: 0 0 0.125rem #ccc, inset 0 0 0.3125rem #eee;
  text-shadow: 0.0625rem 0.0625rem #eee, -0.0625rem 0 #eee;
}
```

---

## Using pixel fallback

You can enable pixel fallback by setting `$rem-fallback` to `true`, but you will have to use the mixin instead of the function.

### SCSS

```scss
@import "rem";

$rem-fallback: true;

.demo {
  @include rem(font-size, 24px); // Simple
  @include rem(padding, 5px 10px); // Multiple values
  @include rem(border-bottom, 1px solid black); // Multiple mixed values
  @include rem(box-shadow, 0 0 2px #ccc, inset 0 0 5px #eee); // Comma-separated values
  // Multiple properties
  @include rem((
    margin: 10px 5px,
    text-shadow: (1px 1px #eee, -1px -1px #eee) // Parentheses needed because of comma
  ));
}
```

### CSS

```css
.demo {
  font-size: 24px;
  font-size: 1.5rem;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-bottom: 1px solid black;
  border-bottom: 0.0625rem solid black;
  box-shadow: 0 0 2px #ccc, inset 0 0 5px #eee;
  box-shadow: 0 0 0.125rem #ccc, inset 0 0 0.3125rem #eee;
  margin: 10px 5px;
  margin: 0.625rem 0.3125rem;
  text-shadow: 1px 1px #eee, -1px -1px #eee;
  text-shadow: 0.0625rem 0.0625rem #eee, -0.0625rem -0.0625rem #eee;
}
```

---

You can totally disable rem units by setting `$rem-px-only` to `true` (for a lt-ie9 only stylesheet for example).

### CSS

```css
.demo {
  font-size: 24px;
  padding: 5px 10px;
  border-bottom: 1px solid black;
  box-shadow: 0 0 2px #ccc, inset 0 0 5px #eee;
  margin: 10px;
  text-shadow: 1px 1px #eee, -1px -1px #eee;
}
```

---

## Changing baseline

By default, sass-rem now uses a 16px baseline, but you can change this value with `$rem-baseline` and by using the `rem-baseline` mixin on the html element to adjust the root font size. The `rem` function and mixin will calculate rem values accordingly.
For example, you can set `$rem-baseline` to 10px to have a root font size of 62.5% and improve readability (10px = 1rem), which was the pre-2.0 behavior.

### SCSS

```scss
@import "rem";

$rem-baseline: 10px;

html {
  @include rem-baseline;
}

.demo {
  font-size: rem(24px);
}
```

### CSS

```css
html {
  font-size: 62.5%;
}

.demo {
  font-size: 2.4rem;
}
```

---

You can also change the baseline zoom by passing the desired zoom to the `rem-baseline` mixin which will calculate it depending of `$rem-baseline`. Useful for creating responsive typography depending on viewport, especially with a different baseline than 16px.

### SCSS

```scss
@import "rem";

$rem-baseline: 10px;

html {
  @include rem-baseline; // Default zoom to 100%

  @media (max-width: 400px) {
    @include rem-baseline(75%);
  }

  @media (min-width: 800px) {
    @include rem-baseline(125%);
  }
}
```

### CSS

```css
html {
  font-size: 62.5%;
}

@media (max-width: 400px) {
  html {
    font-size: 46.875%;
  }
}

@media (min-width: 800px) {
  html {
    font-size: 78.125%;
  }
}
```
