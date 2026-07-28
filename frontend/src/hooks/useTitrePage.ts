import { useEffect } from "react"

function useSeo({ titre, description }) {
  useEffect(() => {
    // 🎯 Titre de la page
    if (titre) {
      document.title = title
    }

    // 🎯 Meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]')

      if (!meta) {
        meta = document.createElement("meta")
        meta.name = "description"
        document.head.appendChild(meta)
      }

      meta.setAttribute("content", description)
    }
  }, [title, description])
}

export default useSeo