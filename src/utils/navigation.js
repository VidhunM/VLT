// Navigation helper to trigger circle transition
export const navigateWithCircle = (event, href, callback = null, color = '#ff6b35') => {
  // Prevent default navigation
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  // Get click position
  const x = event?.clientX || window.innerWidth / 2
  const y = event?.clientY || window.innerHeight / 2

  // Dispatch custom event for circle transition
  const circleEvent = new CustomEvent('circleNavigation', {
    detail: { x, y, href, callback, color }
  })
  
  window.dispatchEvent(circleEvent)
}

export default navigateWithCircle
