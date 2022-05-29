import { useState } from 'react'

export const useHover = () => {
  const [isHover, setHover] = useState(false)

  const props = {
    onMouseOver: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }

  return [props, isHover]
}
