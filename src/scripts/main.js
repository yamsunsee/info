// Menu
const menu = document.querySelector(".menu")
const nav = document.querySelector("nav")
const links = nav.querySelectorAll("li")
const header = document.querySelector("header")

window.onscroll = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const scrolled = window.scrollY
  header.style.setProperty("--value", `${(scrolled * 100) / scrollable}%`)
}

menu.onclick = () => {
  menu.classList.toggle("active")
  nav.style.transition = "ease-out 0.3s"
  nav.classList.toggle("translate-x-full")
  setTimeout(() => {
    nav.style.transition = "none"
  }, 300)
}

links.forEach((link) => {
  link.onclick = () => {
    menu.classList.remove("active")
    nav.classList.add("translate-x-full")
  }
})

// Intersection Observer
const homeSection = document.querySelector("#home")
const aboutSection = document.querySelector("#about")
const projectsSection = document.querySelector("#projects")
const contactSection = document.querySelector("#contact")
let sections = { home: true, about: false, projects: false, contact: false }

function activeLink(linkIndex) {
  links.forEach((link, index) => {
    if (linkIndex === index) {
      link.classList.add("selected")
    } else {
      link.classList.remove("selected")
    }
  })
}

const observer = new IntersectionObserver(
  (entries) => {
    sections[entries[0].target.id] = entries[0].isIntersecting
    if (sections.home) {
      activeLink(0)
    } else if (sections.about) {
      activeLink(1)
    } else if (sections.projects) {
      activeLink(2)
    } else if (sections.contact) {
      activeLink(3)
    }
  },
  {
    rootMargin: "-160px",
  }
)

observer.observe(homeSection)
observer.observe(aboutSection)
observer.observe(projectsSection)
observer.observe(contactSection)

// Dark Mode & Backgrounds Animation
const light = document.querySelector("#light")
const dark = document.querySelector("#dark")

function darkMode() {
  dark.style.transform = "translate(-50%, 50%)"
  dark.style.opacity = 0
  dark.style.cursor = "default"
  light.style.transform = "translate(-50%, -50%)"
  light.style.opacity = 1
  light.style.cursor = "pointer"
  document.documentElement.classList.add("dark")
}

function lightMode() {
  light.style.transform = "translate(-50%, -150%)"
  light.style.opacity = 0
  light.style.cursor = "default"
  dark.style.transform = "translate(-50%, -50%)"
  dark.style.opacity = 1
  dark.style.cursor = "pointer"
  document.documentElement.classList.remove("dark")
}

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkMode()
} else {
  lightMode()
}

light.onclick = () => {
  lightMode()
  localStorage.theme = "light"
}

dark.onclick = () => {
  darkMode()
  localStorage.theme = "dark"
}

// Submit Form
const api = "https://sheetdb.io/api/v1/k14oylrwb6t76"
const form = document.querySelector("#form")
const divList = form.querySelectorAll(".inputContainer")
const inputList = form.querySelectorAll("input, textarea")
const submitButton = form.querySelector("#submit")
const toastMessage = form.querySelector("#toastMessage")
let isCheck = false

const validateString = (string) => {
  return string.trim() !== ""
}

const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

const validate = (element, type = "string") => {
  let isValid = false
  if (isCheck) {
    const p = element.nextElementSibling
    if (validateString(element.value)) {
      if (type === "email") {
        if (validateEmail(element.value)) {
          p.classList.add("hidden")
          isValid = true
        } else {
          p.innerText = "Please enter a valid email address!"
          p.classList.remove("hidden")
        }
      } else {
        p.classList.add("hidden")
        isValid = true
      }
    } else {
      p.innerText = "Please fill out this field!"
      p.classList.remove("hidden")
    }
  }
  return isValid
}

submitButton.onclick = () => {
  if (submitButton.innerText === "SUBMIT") {
    isCheck = true
    let isSubmit = true

    inputList.forEach((input) => {
      let isValid = validate(input, input.type)
      isSubmit = isSubmit && isValid
    })

    if (isSubmit) {
      let data = new FormData()
      data.append("NAME", inputList[0].value.trim())
      data.append("EMAIL", inputList[1].value.trim())
      data.append("MESSAGE", inputList[2].value.trim())
      submitButton.innerText = "Sending..."
      fetch(api, {
        method: "POST",
        body: data,
      }).then(() => {
        divList.forEach((div) => {
          div.classList.add("hidden")
        })
        inputList[2].value = ""
        toastMessage.classList.remove("hidden")
        submitButton.innerText = "Submit again"
      })
    } else {
      for (input of inputList) {
        if (!validate(input, input.type)) {
          input.focus()
          break
        }
      }
    }
  } else {
    divList.forEach((div) => {
      div.classList.remove("hidden")
    })
    toastMessage.classList.add("hidden")
    submitButton.innerText = "Submit"
    inputList[2].focus()
  }
}

inputList.forEach((input) => {
  input.oninput = () => {
    validate(input, input.type)
  }
})

// Animated Text Sphere
const tagCloud = TagCloud(".skills", Array(10).fill(""), {
  radius: 200,
  maxSpeed: "fast",
  initSpeed: "medium",
  direction: 45,
  keep: true,
})
