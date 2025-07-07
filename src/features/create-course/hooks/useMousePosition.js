import { useEffect, useState } from 'react'

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseUp = (e) => {
    const { clientX, clientY } = e
    setMousePosition({ x: clientX, y: clientY })
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return { mousePosition }
}
