# Rem

Sass mixin and function to use rem units with pixel fallback.  

Demo: http://sassmeister.com/gist/f75f0ffd0910a99eee77

Compatibility: Sass 3.2+ (3.3+ for maps) and LibSass

---

## Install

Download [`_rem.scss`](https://raw.githubusercontent.com/pierreburel/sass-rem/master/_rem.scss) or install with [Bower](http://bower.io/): 

```
bower install sass-rem
```

---

## Usage

Import `_rem.scss`, set the html font-size to 62.5% (depending of `$rem-baseline`) and use the `rem` mixin or function :

    @import "rem";

    html {
      font-size: 62.5%;
    }

    h1 {
      @include rem(font-size, 24px); // Simple
      @include rem(border-bottom, 1px solid black); // Shorthand
      @include rem(box-shadow, 0 0 2px #ccc, inset 0 0 5px #eee); // Multiple values
      text-shadow: rem(1px 1px #eee, -1px -1px #eee); // Function and multiple values, warning: no fallback possible with rem function
      // List support (Sass 3.3+)
      @include rem((
        margin: 20px 0,
        padding: 10px
      ));
    }

That will output :

    html {
      font-size: 62.5%;
    }

    h1 {
      font-size: 24px;
      font-size: 2.4rem;
      border-bottom: 1px solid black;
      border-bottom: 0.1rem solid black;
      box-shadow: 0 0 2px #ccc, inset 0 0 5px #eee;
      box-shadow: 0 0 0.2rem #ccc, inset 0 0 0.5rem #eee;
      text-shadow: 0.1rem 0.1rem #eee, -0.1rem -0.1rem #eee; // No fallback
      margin: 20px 0;
      margin: 2rem 0;
      padding: 10px;
      padding: 1rem;
    }

You can disable pixel fallback by setting `$rem-fallback` to `false` :

    h1 {
      font-size: 2.4rem;
      border-bottom: 0.1rem solid black;
      box-shadow: 0 0 2px #ccc, inset 0 0 5px #eee;
      text-shadow: 0.1rem 0.1rem #eee, -0.1rem -0.1rem #eee;
      margin: 2rem 0;
      padding: 1rem;
    }

You can totally disable rem units by setting `$rem-px-only` to `true` (lt-ie9 only stylesheet for example) :

    h1 {
      font-size: 24px;
      border-bottom: 1px solid black;
      box-shadow: 0 0 0.2rem #ccc, inset 0 0 0.5rem #eee;
      text-shadow: 1px 1px #eee, -1px -1px #eee; // Fallback works there
      margin: 20px 0;
      padding: 10px;
    }
