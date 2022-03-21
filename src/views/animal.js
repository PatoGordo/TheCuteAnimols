import { animalsStore } from "../store/animals.js"

export class Animal {
  setup() {
    const route = VueRouter.useRoute()
    const tag = route.params.tag
    let data = Vue.ref(animalsStore.animals[tag])
    
    function firstLetterUpper(txt) {
      return txt.replace(txt[0], txt[0].toUpperCase())
    }
    
    Vue.watch(
      () => animalsStore.animals[tag],
      (val) => {
        data.value = val
      },
      { deep: true }
    )
    
    return {
      firstLetterUpper,
      data,
      tag
    }
  }
  
  template = `
    <div>
      <h2 class="title">{{ firstLetterUpper(tag) }}</h2>
      
      <section class="container">
        <img class="container lazy" style="border-radius: 16px;" v-for="animal in data" :alt="tag" :src="animal.url" />
      </section>
    </div>
  `
}
