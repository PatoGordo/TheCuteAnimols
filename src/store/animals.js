import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js"
import { db } from "../firebase.js"

import { authStore } from "./auth.js"

export const animalsStore = Vue.reactive({
  animals: {
    cat: [],
    dog: [],
    otter: [],
    capybara: [],
    fox: []
  },
  animalsTags: ["cat", "dog", "otter", "capybara", "fox"],
  emojis: {
    cat: "😺",
    dog: "🐶",
    otter: "🦦",
    capybara: "ʕ•ᴥ•ʔ",
    fox: "🦊"
  },
  loadingSaveImage: false,
  async saveAnimal(newImageData) {
    try {
      this.loadingSaveImage = true
      await addDoc(collection(db, "animals"), newImageData)
      await Promise.all([
        newImageData.tags.forEach((tag) => {
          if (tag === "animal") {
            return
          }
          
          animalsStore.animals[tag].push(newImageData)
        })
      ])
    } catch (err) {
      alert(err.message)
    } finally {
      this.loadingSaveImage = false
    }
  },
  async getAnimals() {
    this.animalsTags.forEach(async (tag) => {
      const result = await this.getAnimalType(tag)
      
      this.animals[tag] = result
    })
  },
  async getAnimalType(animal) {
    try {
      let finalArray = []
      const q = query(collection(db, "animals"), where("tags", "array-contains", animal))
      
      const querySnapshot = await getDocs(q)
      await Promise.all([
        querySnapshot.forEach((doc) => {
          finalArray.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      ])
      
      return finalArray
    } catch (e) {
      alert(e.message)
    }
  },
})
