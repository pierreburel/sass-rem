# Rem

Sass mixin and function to use rem units with pixel fallback


---

## Usage

Just import `_rem.scss` and use the `rem` mixin or function :

    @import "rem";

    html {
      font-size: 62.5%;
    }

    h1 {
      @include rem(font-size, 24px);
      @include rem(margin, 24px auto);
      border-bottom: 1px solid black;
      border-bottom-width: rem(1px);
    }

That will output :

    html {
      font-size: 62.5%;
    }

    h1 {
      font-size: 24px;
      font-size: 2.4rem;
      margin: 24px auto;
      margin: 2.4rem auto;
      border-bottom: 1px solid black;
      border-bottom: 0.1rem;
    }