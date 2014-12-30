# Rem

Sass mixin and function to use rem units with pixel fallback


---

## Usage

Import `_rem.scss` and use the `rem` mixin or function :

    @import "rem";

    html {
      font-size: 62.5%;
    }

    h1 {
      @include rem(border-bottom, 1px solid black);
      @include rem(font-size, 24px);
      text-shadow: rem(1px 1px #eee, -1px -1px #eee); // No fallback
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
      border-bottom: 1px solid black;
      border-bottom: 0.1rem solid black;
      font-size: 24px;
      font-size: 2.4rem;
      text-shadow: 0.1rem 0.1rem #eee, -0.1rem -0.1rem #eee;
      margin: 20px 0;
      margin: 2rem 0;
      padding: 10px;
      padding: 1rem;
    }

You can disable pixel fallback by setting `$rem-fallback` to `false` :

    h1 {
      border-bottom: 0.1rem solid black;
      font-size: 2.4rem;
      text-shadow: 0.1rem 0.1rem #eee, -0.1rem -0.1rem #eee;
      margin: 2rem 0;
      padding: 1rem;
    }
