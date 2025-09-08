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

      <div v-if="show"
           ref="card"
           class="flip-card center"
           :class="{flipped:flipped}"
           style="height: 80%;
           width: 96%;
           max-height: 400px;
           max-width: 960px;
           "
      >
        <div class="flip-card-inner w3-card-4  w3-content w3-round-xxlarge"
             ref="flipCardInner"
        >
          <div class="flip-card-front w3-yellow w3-round-xxlarge"

          >
            <RouterLink to="/math" v-slot="routerProps">
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
                @click="reshuffle()"
                style="cursor:pointer; position: relative; z-index: 10"
            >
              &nbsp;<i class="fa fa-random"></i>&nbsp;
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
            <table class="center xw3-green w3-hide-small" style="width:100%; table-layout:fixed; margin: 0" xborder="1">
              <thead>

              <tr>
                <td>
                  <button class="w3-button w3-xxlarge w3-orange w3-round-xxlarge" @click="nextWord(-1)">&#10094;
                  </button>
                </td>
                <td></td>

                <td colspan="8" class="w3-center">
                  <span class="xw3-cursive w3-monospace bold w3-mega"
                        v-html="words[props.index].problem"
                  />

                </td>
                <td> &nbsp</td>
                <td style="text-align:right">
                  <button class="w3-button w3-xxlarge w3-orange w3-round-xxlarge" @click="nextWord(+1)">&#10095;
                  </button>
                </td>
              </tr>
              </thead>
            </table>

            <!--        see comment above the table as to why this shows up at the top.-->
            <div class="w3-center" :title="seed" @click="flipped=!flipped">
              ({{ props.index + 1 }}/{{ words.length }})
            </div>
          </div>

          <div class="flip-card-back w3-pink w3-round-xxlarge"
          >
<!--            <RouterLink to="/" v-slot="routerProps">-->
<!--              &lt;!&ndash;-->
<!--                the body of the card can sit on top of these buttons and make them impossible to click.-->
<!--                hard to see without modifying the bg color of the body.-->
<!--                raise them up a bit.-->
<!--              &ndash;&gt;-->
<!--              <button-->
<!--                  class="w3-left w3-margin-left w3-margin-top w3-xlarge w3-text-blue w3-hover-text-teal w3-hover-pale-yellow w3-round-xxlarge"-->
<!--                  @click="routerProps.navigate"-->
<!--                  style="cursor:pointer; position: relative; z-index: 10"-->
<!--              >-->
<!--                &nbsp;<i class="fa fa-home"></i>&nbsp;-->
<!--              </button>-->
<!--            </RouterLink>-->


<!--            <button-->
<!--                class="w3-right w3-margin-right w3-margin-top w3-xlarge w3-text-blue w3-hover-text-teal w3-hover-pale-yellow w3-round-xxlarge"-->
<!--                @click="reshuffle()"-->
<!--                style="cursor:pointer; position: relative; z-index: 10"-->
<!--            >-->
<!--              &nbsp;<i class="fa fa-random"></i>&nbsp;-->
<!--            </button>-->

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
            <table class="center xw3-green w3-hide-small" style="width:100%; table-layout:fixed; margin: 0" xborder="1">
              <thead>

              <tr>
                <td>
                  <button class="w3-button w3-xxlarge w3-orange w3-round-xxlarge" @click="nextWord(-1)">&#10094;
                  </button>
                </td>
                <td></td>

                <td colspan="8" class="w3-center">
                  <span class="xw3-cursive w3-monospace bold w3-jumbo"
                     v-html="words[props.index].problem + ' = ' +  words[props.index].answer "
                  >
                  </span>
                </td>
                <td> &nbsp</td>
                <td style="text-align:right">
                  <button class="w3-button w3-xxlarge w3-orange w3-round-xxlarge" @click="nextWord(+1)">&#10095;
                  </button>
                </td>
              </tr>
              </thead>
            </table>

            <!--        see comment above the table as to why this shows up at the top.-->
            <div class="w3-center" :title="seed" @click="flipped=!flipped">
              ({{ props.index + 1 }}/{{ words.length }})
            </div>
          </div>
        </div>
      </div>

    </transition>

  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useSwipe, useStorage} from "@vueuse/core"

import {useWordStore} from "@/stores/words.js";
import router from "@/router/index.js";
import {useWindowSize} from '@vueuse/core'
import {randomNumberGenerator} from "@/stores/randomNumberGenerator.js";

const {width, height} = useWindowSize()


const props = defineProps({
  listName: {
    type: String,
    default: "kinder"
  },
  index: {
    type: Number,
    default: 0
  }
})


import {randomNumberGenerator as newRandom} from '@/stores/randomNumberGenerator.js'

const wordStore = useWordStore()

const card = ref(null)
const flipCardInner = ref(null)

const show = ref(true)

const swipeName = ref("look-right")

const flipped = ref(false)

let initialX, initialY;
let clientX
let rotDeg

let needsLandscape = computed(() => {
  return width.value <= 600
})

const {direction, isSwiping, lengthX, lengthY} = useSwipe(card, {
  passive: false,
  threshold: 5,
  onSwipeStart(e) {
    if (needsLandscape.value) {
      return
    }


    clientX = e.touches[0].clientX
    initialX = e.touches[0].clientX - card.value.offsetLeft;
    initialY = e.touches[0].clientY - card.value.offsetTop;
    // console.log("Swip start... initialX = ", initialX)
  },
  onSwipe(event) {
    if (needsLandscape.value) {
      return
    }

    // if we are not flipped, modify the yrot value instead of the
    // div position.


    // distance the finger has moved.
    const offsetX = event.touches[0].clientX - clientX
    const currentX = event.touches[0].clientX - initialX;

    const currentY = event.touches[0].clientY - initialY;


    // 3 is a magic constant.  tring to scale the slide of your finger
    // to the spinning of the card.
    // smart guys would take the velocity of the slide into consideration).
    if (!flipped.value) {
      rotDeg = Math.max(Math.min(offsetX / 3,0), -180)
      // console.log("Swiping:   ", clientX, offsetX, rotDeg)
      flipCardInner.value.style.transform = "rotateY(" + rotDeg + "deg)"
      flipCardInner.value.style.transition = "unset"
      return
    }


    // Update the div's position
    card.value.style.left = currentX + "px";
    // card.value.style.top = currentY + "px";


    // debugger;
  },
  onSwipeEnd(event, direction) {


    if (needsLandscape.value) {
      return
    }

    if (flipCardInner.value.style.transform) {
      flipCardInner.value.style.transform = null
      flipCardInner.value.style.transition = null
      // console.log("Swip end. lengthX = ",lengthX.value)
      if (rotDeg < -45) {
        flipped.value = !flipped.value
      }
      return
    }

    // 50 is magic constant.  how far must you swipe a card before it
    // changes cards after you let it go?
    // if you are 50 pixels away from where you started, consider it swiped.

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

const baseWords = [
  // {problem: "43 + 19", answer: "62"},
]

// const words = computed(() => ["A", "Pterodactyl", ...shuffle(dictionary[props.listName]||["" + props.listName + "Not Found" ])])
const words = computed(() => {

  let wordList = wordStore.getList(props.listName)

  // don't add the baseWords to the alphabet.
  if (props.listName.indexOf("alphabet") === -1) {
    // if the list is not alphabet, then add some base words.
    wordList = [...baseWords, ...wordList]
  }

  // don't shuffle the alphabetAZ list.
  if (props.listName !== "alphabetAZ") {
    // shuffle it.
    wordList = shuffle(wordList)
  }

  return wordList

})

const wordBasedFontSize = computed(() => {

  return "w3-mega"
})


// store the in local storage.
const seed = useStorage('random-seed', 0)

function reshuffle() {
  // because the list of words is computed, and looks at seed, this should cause a reshuffle.
  seed.value = new Date().getTime()

  // the list changed.  should they say where they are?  probably not. head back to the first item.
  router.push({params: {index: 0}})

}

function shuffle(array) {

  const random = newRandom(seed.value);

  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    // where did I find this?  https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    // javascript destructuring assignment.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}


function nextWord(count) {

  if (count < 0) {
    swipeName.value = "look-left"
  } else {
    swipeName.value = "look-right"
    if (!flipped.value) {
      flipped.value = true;
      return
    }
  }


  let someValue = props.index + count
  //currentIndex.value += count;
  if (someValue < 0) {
    card.value.style.left = null;

    return
  } else if (someValue >= words.value.length) {
    router.push("/math")
    return
    // someValue = words.value.length;
  }


  // hiding the card causes the animations to run.
  show.value = false;

  router.push({params: {index: someValue}})


  setTimeout(() => {
    // show the card 150 ms later.  the hide animations should be done.
    // now we use the 'show' animations.

    if (flipped.value) {
      flipped.value = false;
    }

    show.value = true
  }, 150)

}

</script>

<style>


.flip-card {
  background-color: transparent;
  xwidth: 300px;
  xheight: 300px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

/* if we are swiping, we don't want the transition transform.  we will set the rotateY based
  on finger position.
 */


.flip-card-inner.swiping {
  transition: unset
}

.flip-card.flipped .flip-card-inner {
  transform: rotateY(-180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
}

.flip-card-back {
  transform: rotateY(180deg);
}


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
  but these should match the timeout values in nextWord() function.
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
