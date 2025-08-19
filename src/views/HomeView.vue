<script setup>

const links={
  'Alphabet A-Z': '/alphabetAZ',
  alphabet: '/alphabet',
  'Pre-K': '/pre-k',
  'Short Words': '/short',
  kinder: '/kinder',
  first: '/first',
  second: '/second',
  third: '/third',
  nouns: '/nouns',
  all: '/all'
}
</script>

<template>
  <div>

    <header>
      <div class="w3-container w3-content w3-indigo">
        <h3 class="w3-left">Sight Words!</h3>
        <h3 class="w3-right"> <RouterLink to="/about">About</RouterLink></h3>
      </div>
    </header>
    <main class="w3-container w3-content w3-xlarge">
      <nav>
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


