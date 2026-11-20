import { useEffect } from 'react'

const BASE_TITLE = 'RoveDrive — Drive Your Next Adventure'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | RoveDrive` : BASE_TITLE

    return () => {
      document.title = BASE_TITLE
    }
  }, [title])
}
