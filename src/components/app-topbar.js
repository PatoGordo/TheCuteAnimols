import { authStore } from "../store/auth.js"

export class AppTopbar {
  setup() {
    const isOpen = Vue.ref(false)
    
    return {
      authStore,
      isOpen
    }
  }
  
  template = `
    <nav class="navbar responsive bg-pink" :class="isOpen? 'open' : ''">
      <span @click="$router.go(-1)" v-if="$route.name !== 'home'">
        <span class="iconify icon" data-icon="akar-icons:arrow-left"></span>
      </span>
      
      <h1 @click="$router.push('/')">
        The Cute Animols
      </h1>
      
      <ul class="content">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link :to="authStore.haveUser? '/profile' : '/sign-in'">{{ authStore.haveUser? 'Profile' : 'Sign In' }}</router-link></li>
      </ul>
      
      <span @click="isOpen = !isOpen" class="toggler">
        <span class="iconify icon toggler" data-icon="charm:menu-hamburger"></span>
      </span>
    </nav>
    
    <ul class="mobile-content bg-deep-pink container center" :class="isOpen? 'open' : ''" @click="isOpen = !isOpen">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/new-photo">New photo</router-link></li>
      <li><router-link :to="authStore.haveUser? '/profile' : '/sign-in'">{{ authStore.haveUser? 'Profile' : 'Sign In' }}</router-link></li>
    </ul>
  `
}
