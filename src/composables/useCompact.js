import { onBeforeUnmount, onMounted, ref } from 'vue'

// True on narrow screens, where the visuals switch to a taller layout so their text stays readable.
export function useCompact(query = '(max-width: 639px)') {
  const compact = ref(typeof window !== 'undefined' && window.matchMedia(query).matches)
  let media
  const update = (e) => (compact.value = e.matches)

  onMounted(() => {
    media = window.matchMedia(query)
    compact.value = media.matches
    media.addEventListener('change', update)
  })
  onBeforeUnmount(() => media?.removeEventListener('change', update))

  return compact
}
