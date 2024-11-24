<template>

  <div class="xw3-container w3-orange full-height" style="overflow:hidden;">

    <!--    direction={{direction}} &#45;&#45; is={{isSwiping}} card = {{card}}-->

    <!--    <div class="w3-container w3-hide-medium w3-hide-large w3-red">-->
    <!--      <p>I am small a screen (phones)</p>-->
    <!--    </div>-->

    <!--    <div class="w3-container w3-hide-small w3-hide-large w3-green">-->
    <!--      <p>I am a medium screens (tablets)</p>-->
    <!--    </div>-->

    <!--    <div class="w3-container w3-hide-small w3-hide-medium w3-blue">-->
    <!--      <p>I am a large screens (laptops/desktop)</p>-->
    <!--    </div>-->


    <transition :name="swipeName">


      <div v-if="show" class="w3-card-4 w3-yellow w3-content w3-round-xxlarge center"
           ref="card"
           style="
          height: 80%;
          width: 96%;
          max-height: 400px;
          max-width: 960px;
          overflow: hidden">


        <RouterLink to="/" v-slot="routerProps">
<!--
  the body of the card can sit on top of these buttons and make them impossible to click.
  hard to see without modifying the bg color of the body.
  raise them up a bit.
-->
            <button
                class="w3-left w3-margin-left w3-margin-top w3-xlarge w3-text-blue w3-hover-text-teal w3-hover-pale-yellow w3-round-xxlarge"
                @click="routerProps.navigate"
                style="cursor:pointer; position: relative; z-index: 10"
            >
              &nbsp;<i class="fa fa-home"></i>&nbsp;
            </button>
        </RouterLink>


        <button
            class="w3-right w3-margin-right w3-margin-top w3-xlarge w3-text-blue w3-hover-text-teal w3-hover-pale-yellow w3-round-xxlarge"
            @click="settings()"
            style="cursor:pointer; position: relative; z-index: 10"
        >
          &nbsp;<i class="fa fa-gear"></i>&nbsp;
        </button>

        <div class="w3-hide-large w3-hide-medium w3-clear w3-container w3-xxlarge">
          <div>
            <p>
              This page should be viewed in landscape mode. Try turning your phone sideways.
            </p>

          </div>
        </div>

        <!--    <br>-->
        <!--
        people say not use tables for layout.  I have to think they are wrong.
        this was so Easy to do.
        -->

<!--
  since this block element is centered (with position/left/translate), the table is lifted out of the dom.
  so any other block elements will show up above it.

  and since the home and settings icons are floated (with w3-left and w3-right), the block level element at the bottom
  will show up between the buttons. (depending on the size of the block).

-->
        <table class="center xw3-green w3-hide-small" style="width:100%; table-layout:fixed; margin: 0">
          <thead>

          <tr>
            <td>
              <button class="w3-button w3-orange w3-round-xxlarge" @click="nextWord(-1)">&#10094;</button>
            </td>
            <td> </td>

            <td colspan="8" class="w3-center">
                  <span class="xw3-cursive w3-monospace bold" :class="wordBasedFontSize">
                  {{ words[currentIndex] }}
                  </span>
            </td>
            <td> &nbsp</td>
            <td style="text-align:right">
              <button class="w3-button w3-orange w3-round-xxlarge" @click="nextWord(+1)">&#10095;</button>
            </td>
          </tr>
          </thead>
        </table>

<!--        see comment above the table as to why this shows up at the top.-->
        <div class="w3-center">
            ({{ currentIndex + 1 }}/{{ words.length }})
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import {computed, ref} from "vue";

const props=defineProps({
  listName: {
    type: String,
    default: "kinder"
  }
})

// import { UseSwipeDirection } from '@vueuse/core'
import {useSwipe} from "@vueuse/core"


const otherwords = ["THE", "AND", "YOU", "THAT", "WAS", "FOR", "ARE", "WITH", "HIS", "THEY", "ONE", "HAD", "THIS", "FROM", "WANT", "WORD", "WHAT", "WERE", "WHEN", "YOUR", "SAID", "THERE", "USE", "EACH", "WHICH"]

const prek = ["a", "and", "away", "big", "blue", "can", "come", "down", "find", "for", "funny", "go", "help", "here", "I", "in", "is", "it", "jump", "little", "look", "make", "me", "my", "not", "one", "play", "red", "run", "said", "see", "the", "three", "to", "two", "up", "we", "where", "yellow", "you"]
const kinder = shuffle(["all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran", "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this", "too", "under", "want", "was", "well", "went", "what", "white", "who", "will", "with", "yes"])
const first = ["after", "again", "an", "any", "as", "ask", "by", "could", "every", "fly", "from", "give", "going", "had", "has", "her", "him", "his", "how", "just", "know", "let", "live", "may", "of", "old", "once", "open", "over", "put", "round", "some", "stop", "take", "thank", "them", "then", "think", "walk", "were", "when"]
const second = ["always", "around", "because", "been", "before", "best", "both", "buy", "call", "cold", "does", "don’t", "fast", "first", "five", "found", "gave", "goes", "green", "its", "made", "many", "off", "or", "pull", "read", "right", "sing", "sit", "sleep", "tell", "their", "these", "those", "upon", "us", "use", "very", "wash", "which", "why", "wish", "work", "would", "write", "your"]
const third = ["about", "better", "bring", "carry", "clean", "cut", "done", "draw", "drink", "eight", "fall", "far", "full", "got", "grow", "hold", "hot", "hurt", "if", "keep", "kind", "laugh", "light", "long", "much", "myself", "never", "only", "own", "pick", "seven", "shall", "show", "six", "small", "start", "ten", "today", "together", "try", "warm"]
const nouns = ["A", "Pteradactyl", ...shuffle(["apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "birthday", "boat", "box", "boy", "bread", "brother", "cake", "car", "cat", "chair", "chicken", "children", "Christmas", "coat", "corn", "cow", "day", "dog", "doll", "door", "duck", "egg", "eye", "farm", "farmer", "father", "feet", "fire", "fish", "floor", "flower", "game", "garden", "girl", "goodbye", "grass", "ground", "hand", "head", "hill", "home", "horse", "house", "kitty", "leg", "letter", "man", "men", "milk", "money", "morning", "mother", "name", "nest", "night", "paper", "party", "picture", "pig", "rabbit", "rain", "ring", "robin", "Santa Claus", "school", "seed", "sheep", "shoe", "sister", "snow", "song", "squirrel", "stick", "street", "sun", "table", "thing", "time", "top", "toy", "tree", "watch", "water", "way", "wind", "window", "wood"])]
const wordsFromSomewhere = ["a", "it", "on", "the", "we", "for", "that", "they", "I", "in", "to", "he", "are", "you", "have", "with", "at", "is", "and", "be", "was", "she", "this", "from"]


const dictionary = {
  "prek": prek,
  "kinder": kinder,
  "first": first,
  "second": second,
  "third": third,
  "nouns": nouns,
  "wordsFromSomewhere": wordsFromSomewhere
}


const card = ref(null)

const show = ref(true)

const swipeName = ref("look-right")

window.foo = card

let initialX, initialY;

const {direction, isSwiping, lengthX, lengthY} = useSwipe(card, {
  passive: false,
  threshold: 5,
  onSwipeStart(e) {
    // e.preventDefault() // prevents scrolling.

    initialX = e.touches[0].clientX - card.value.offsetLeft;
    initialY = e.touches[0].clientY - card.value.offsetTop;
  },
  onSwipe(event) {
   // event.preventDefault();

    const currentX = event.touches[0].clientX - initialX;
    const currentY = event.touches[0].clientY - initialY;

    // Update the div's position
    card.value.style.left = currentX + "px";
    // card.value.style.top = currentY + "px";


    // debugger;
  },
  onSwipeEnd(e, direction) {
    if (Math.abs(lengthX.value) < 50) {
      card.value.style.left = null;
      return
      // card.value.style.top = 0;
    }
    if (direction === "left") {
      nextWord(+1)
    } else if (direction === "right") {
      nextWord(-1)
    }
  }
})


const words = computed(() => ["A", "Pterodactyl", ...shuffle(dictionary[props.listName]||["" + props.listName + "Not Found" ])])

const wordBasedFontSize = computed(() => {

  if (! words.value) {
    return "w3-super";
  }
  const wordLength = words.value[currentIndex.value].length;

  if (wordLength < 8) {
    return "w3-super"
  } else if (wordLength < 11) {
    return "w3-mega"
  } else {
    return "w3-jumbo"
  }
})

const currentIndex = ref(0);

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function nextWord(count) {

  if (count < 0) {
    swipeName.value = "look-left"
  } else {
    swipeName.value = "look-right"
  }

  // hiding the card causes the animations to run.
  show.value = false;

  currentIndex.value += count;
  if (currentIndex.value < 0) {
    currentIndex.value = words.value.length - 1;
  } else if (currentIndex.value >= words.value.length) {
    currentIndex.value = 0;
  }

  setTimeout(() => {
    show.value = true
  }, 150)

}

</script>

<style>

.center-ai {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.bold {
  font-weight: bold;
}


.w3-mega {
  font-size: 84px;
}

.w3-super {
  font-size: 120px;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.look-right-enter-active, .look-left-enter-active {
  transition: all 0.150s ease-out;
}

.look-right-leave-active, .look-left-leave-active {
  transition: all 0.150s cubic-bezier(1, 0.5, 0.8, 1);
}


.look-right-leave-to, .look-left-enter-from {
  transform: translate(-200%, -50%);
}

.look-right-enter-from, .look-left-leave-to {
  transform: translate(200%, -50%);
}

</style>
