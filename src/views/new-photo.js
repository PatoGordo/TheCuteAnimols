import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js"

import { animalsStore } from "../store/animals.js"
import { authStore } from "../store/auth.js"

import { storage } from "../firebase.js"

export class NewPhoto {
  setup() {
    const file = Vue.ref(null)
    const fileURL = Vue.ref(null)
    const processing = Vue.ref(false)
    const choosedTags = Vue.ref(["animal"])
    
    const router = VueRouter.useRouter()

    async function fileInput(e) {
      try {
        processing.value = true
        file.value = e.target.files[0]

        const storageRef = ref(storage, 'animals/'+GenerateId(24))

        const snapshot = await uploadBytes(storageRef, file.value)

        getDownloadURL(snapshot.ref).then((downloadURL) => {
          fileURL.value = downloadURL
        })
      } catch (err) {
        alert(err.message)
      } finally {
        processing.value = false
      }
    }
    
    async function savePhoto() {
      if (!fileURL.value) {
        return alert("Photo is required")
      }
      
      await animalsStore.saveAnimal({ uid: authStore.user.uid, url: fileURL.value, tags: choosedTags.value })
      router.push('/animal/'+choosedTags.value[1])
    }

    return {
      file,
      fileURL,
      processing,
      fileInput,
      animalsStore,
      choosedTags,
      savePhoto,
      authStore
    }
  }

  template = `
    <div v-if="authStore.canWrite">
      <h2 class="title">New animal photo</h2>
      
      <img v-if="fileURL" :src="fileURL" class="container lazy" style="border-radius: 16px;" />
      
      <input
        type="file"
        v-model="file"
        accept="image/png, image/jpeg"
        placeholder="Click to upload file"
        @change="fileInput"
        :disabled="processing"
      />
      <span v-if="processing" class="container row v-center h-start"><div class="loading upload"></div> Uploading image...</span>
      
      <h3 class="sub-title">Choosed tags</h3>
      <span class="container row v-center h-start" style="flex-wrap: wrap">
        <span v-for="(tag, index) in choosedTags" class="tag bg-deep-pink c-white" @click="tag !== 'animal'? choosedTags.splice(index, 1) : null">{{ tag !== 'animal'? '× ' : ''}}{{ animalsStore.emojis[tag] }}{{ tag }}</span>
      </span>
      
      <h3 class="sub-title">Available tags</h3>
      <span class="container row v-center h-start" style="flex-wrap: wrap">
        <span @click="choosedTags.push(tag)" v-for="tag in animalsStore.animalsTags" class="tag bg-pink c-white" :class="choosedTags.includes(tag)? 'd-none': ''">{{ animalsStore.emojis[tag] }}{{ tag }}</span>
      </span>
      
      <button class="outlined half border-pink" style="margin-top: 16px;" @click="savePhoto" :disabled="animalsStore.loadingSaveImage">Save new photo</button>
    </div>
    <div v-else>
      <h2 class="title">You can't create a new image</h2>
      <router-link to="/">Return to home</router-link>
    </div>
  `
}
