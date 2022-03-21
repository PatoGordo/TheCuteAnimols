import { Home } from "../views/home.js"
import { SignIn } from "../views/sign-in.js"
import { Profile } from "../views/profile.js"
import { Animal } from "../views/animal.js"
import { NewPhoto } from "../views/new-photo.js"
import { Page404 } from "../views/404.js"

export const views = [
  {
    name: "home",
    path: "/",
    component: new Home(),
    alias: '/index.html'
  },
  {
    name: "animal",
    path: "/animal/:tag",
    component: new Animal()
  },
  {
    name: "new photo",
    path: "/new-photo",
    component: new NewPhoto()
  },
  {
    name: 'sign-in',
    path: '/sign-in',
    component: new SignIn()
  },
  {
    name: 'profile',
    path: '/profile',
    component: new Profile()
  },
  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: new Page404()
  }
]
