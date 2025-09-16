<script setup>

import NavBar from "@/views/NavBar.vue";

const links={
  'Alphabet A-Z': '/alphabetAZ',
  Alphabet: '/alphabet',
  'Pre-K': '/pre-k',
  'Short Words': '/short',
  Kinder: '/kinder',
  First: '/first',
  Second: '/second',
  Third: '/third',
  Nouns: '/nouns',
  Funny: '/funny',
  All: '/all'
}
</script>

<template>
  <div>

    <header>
      <NavBar/>
    </header>
    <main class="w3-container w3-content w3-xlarge">
      <nav>
        <h2 class="w3-center w3-bold w3-text-deep-purple">Sight Words!</h2>
        <ul style="padding: 0; margin: 1em 0 0 0; list-style: none;">

          <template v-for="(link, name) in links" :key="name">

            <router-link :to="link"
                         v-slot=" {href, route, navigate, isActive, isExactActive}"
                         custom>
              <li @click="navigate"
                  class="w3-yellow  w3-block w3-button w3-round-xxlarge w3-margin-bottom"
              >
                <a style="text-decoration: none" :href="href" @click="navigate">{{ name }}</a>
              </li>

            </router-link>

          </template>
        </ul>
      </nav>


    </main>
  </div>
</template>


