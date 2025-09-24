<script setup>
import NavBar from "@/views/NavBar.vue";
import {useRouter} from "vue-router";

const router=useRouter()



</script>

<template>
  <div>

    <header>
      <NavBar/>
    </header>
    <main class="w3-container w3-content w3-xlarge">
      <h1>Welcome</h1>

      <p>
        Welcome to Free Sight Words! I was hanging with my daughter the other day waiting for her brother to
        finish soccer and thought I would quickly go over some sight words with her. I ran a quick google search and
        we got completely inundated with ads. I understand that everyone just wants to make a quick buck, but I
        knew that someone out there would just offer up an easy sight word app for free without all the hoops.

      </p>
      <p @click='router.push("/m")' >
        I was wrong. So, here it is.
      </p>

      <p>
        This APP is free. There are no ads. There are no tracking cookies. I won't ask for your email, so you won't
        ever get an email from me.
      </p>

      <p @click='router.push("/fire")'>
        Enjoy!
      </p>

      <p>
        <RouterLink to="/">Back to Sight Words</RouterLink>
      </p>

    </main>
  </div>
</template>


