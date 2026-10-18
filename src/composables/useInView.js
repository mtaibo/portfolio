import { onBeforeUnmount, onMounted, ref } from 'vue'

// Tracks whether an element is on screen, so its animation only runs while it can be seen.
export function useInView(options = { threshold: 0.2 }) {
  const el = ref(null)
  const inView = ref(false)
  const seen = ref(false)
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      inView.value = entry.isIntersecting
      if (entry.isIntersecting) seen.value = true
    }, options)
    if (el.value) observer.observe(el.value)
  })
  onBeforeUnmount(() => observer?.disconnect())

  return { el, inView, seen }
}
