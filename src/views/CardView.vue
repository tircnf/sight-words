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

          <div class="w3-flex" style="flex-direction: column; ">


<!--
            the z-index is required because the middle "div" is centered, position absolute,
            and can overlay the home/shuffle buttons.
-->
            <div class="w3-flex" style="justify-content: space-around; z-index: 1; align-items: center;">


              <RouterLink to="/" v-slot="routerProps">
                <button
                    class="w3-left xxxw3-margin-left w3-margin-top w3-xlarge w3-text-blue w3-hover-text-teal w3-hover-pale-yellow w3-round-xxlarge"
                    @click="routerProps.navigate"
                    style="cursor:pointer; margin-left: 3px"
                >
                  &nbsp;<i class="fa fa-home"></i>&nbsp;
                </button>
              </RouterLink>

              <div class="" :title="seed">
                ({{ props.index + 1 }}/{{ words.length }})
              </div>


              <button
                  class="w3-right w3-margin-right w3-margin-top w3-xlarge w3-text-blue w3-hover-text-teal w3-hover-pale-yellow w3-round-xxlarge"
                  @click="reshuffle()"
                  style="cursor:pointer; "
              >
                &nbsp;<i class="fa fa-random"></i>&nbsp;
              </button>
            </div>

            <div class="w3-yellow w3-flex center"
                 style="align-items: center; justify-content: space-between; width: 100%;"
            >
              <button class="xxw3-margin-left w3-button w3-xxlarge w3-orange w3-round-xxlarge "
                      @click="nextWord(-1)"
                      style="margin-left: 3px; "
              >
                &#10094;
              </button>

              <div>

<!--                to do:  use this div to measure the size of the word, then use a transform to set the size of the span-->
                <div ref="measureDiv" style="visibility: hidden; position: absolute"><span class="xw3-cursive w3-monospace bold w3-xxxlarge"
                           >{{ words[props.index] }}</span></div>

                <span class="xw3-cursive w3-monospace bold" :class="wordBasedFontSize"
                      style="word-break: break-word">{{ words[props.index] }}</span>
              </div>


              <button class="xxw3-margin-right w3-button w3-xxlarge w3-orange w3-round-xxlarge"
                      @click="nextWord(+1)"
                      style="margin-right: 3px;"
              >
                &#10095;
              </button>
            </div>

          </div>

      </div>
    </transition>

  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useSwipe, useStorage, useElementSize, useWindowSize} from "@vueuse/core"


import {useWordStore} from "@/stores/words.js";
import router from "@/router/index.js";



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


import {randomNumberGenerator as newRandom} from "@/stores/randomNumberGenerator.js";


// import { UseSwipeDirection } from '@vueuse/core'

const wordStore = useWordStore()

const card = ref(null)
const measureDiv = ref(null)

window.foo=measureDiv
const {width : textWidth} = useElementSize(measureDiv)

const show = ref(true)

const swipeName = ref("look-right")

let initialX, initialY;

let needsLandscape = computed(() => {
  return false;
  return width.value <= 600
})

const {direction, isSwiping, lengthX, lengthY} = useSwipe(card, {
  passive: false,
  threshold: 5,
  onSwipeStart(e) {
    if (needsLandscape.value) {
      // e.preventDefault()
      return
    }

    initialX = e.touches[0].clientX - card.value.offsetLeft;
    initialY = e.touches[0].clientY - card.value.offsetTop;
  },
  onSwipe(event) {
    if (needsLandscape.value) {
      // event.preventDefault()
      return
    }

    const currentX = event.touches[0].clientX - initialX;
    const currentY = event.touches[0].clientY - initialY;

    // Update the div's position
    card.value.style.left = currentX + "px";
    // card.value.style.top = currentY + "px";


    // debugger;
  },
  onSwipeEnd(e, direction) {


    if (needsLandscape.value) {
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
  "Pterodactyl",
  "bioluminescence",
]

// const words = computed(() => ["A", "Pterodactyl", ...shuffle(dictionary[props.listName]||["" + props.listName + "Not Found" ])])
const words = computed(() => {

  // return Array.from({length: 20}, (_, index) => "M".repeat(index + 1))
  // return ["M","MM","MMM","MMMM","MMMMM","MMMMMM","MMMMMMM","MMMMMMMM","MMMMMMMMM","MMMMMMMMMM","MMMMMMMMMMM","MMMMMMMMMMMM","MMMMMMMMMMMMM"];

  let wordList = wordStore.getList(props.listName)

  // don't add the baseWords to the alphabet.
  if (props.listName.indexOf("alphabet") === -1 && props.listName !== "m") {
    // if the list is not alphabet, then add some base words.
    wordList = [...baseWords, ...wordList]
  }

  // don't shuffle the alphabetAZ list.
  if (props.listName !== "alphabetAZ" && props.listName !=="m") {
    // shuffle it.
    wordList = shuffle(wordList)
  }

  return wordList

})

const wordBasedFontSize = computed(() => {

  /*
  .w3-tiny{font-size:10px!important}
  .w3-small{font-size:12px!important}
  .w3-medium{font-size:15px!important}
  .w3-large{font-size:18px!important}
  .w3-xlarge{font-size:24px!important}
  .w3-xxlarge{font-size:36px!important}



  .w3-xxxlarge{font-size:48px!important}
  .w3-jumbo{font-size:64px!important}
   -- custom
.w3-super { font-size: 84px; }
.w3-mega { font-size: 120px; }

   */

  const wordLength = words.value[props.index].length;

  if (width.value < 600) {
    if (wordLength < 4) {
      return "w3-mega"
    } else if (wordLength < 5) {
      return "w3-super"
    } else if (wordLength < 9) {
      return "w3-xxxlarge"
    } else if (wordLength < 12) {
      return "w3-xxlarge"
    } else if (wordLength < 18) {
      return "w3-xlarge"
    } else {
      return "w3-large"
    }
  }

  if (!words.value) {
    return "w3-super";
  }

  if (wordLength < 8) {
    return "w3-mega"
  } else if (wordLength < 11) {
    return "w3-super"
  } else if (wordLength < 13) {
    return "w3-jumbo"
  } else {
    return "w3-xxxlarge"
  }
})


// store the in local storage.
const seed = useStorage('random-seed', 0)

function reshuffle() {
  // because the list of words is computed, and looks at seed, this should cause a reshuffle.
  seed.value = new Date().getTime()

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
  }


  let someValue = props.index + count
  //currentIndex.value += count;
  if (someValue < 0) {
    card.value.style.left = null;

    return
  } else if (someValue >= words.value.length) {
    router.push("/")
    return
    // someValue = words.value.length;
  }

  // hiding the card causes the animations to run.
  show.value = false;

  router.push({params: {index: someValue}})


  setTimeout(() => {
    // this magic constant should be the same as the transition values in the .css below.
    // show the card 150 ms later.  the hide animations should be done.
    // now we use the 'show' animations.
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


.w3-super {
  font-size: 84px;
}

.w3-mega {
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
