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

// Dark Mode
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
