import { useEffect, useState } from "react"


const HomePage = () => {
  useEffect(() => { async () => {
      const response = await fetch("http://localhost:5000/api/posts")
      const data = await response.json()
      console.log(data)
    }
  }, [])

  return (
    <>
      <div className="home">
        <h2>Welcome to the MERN Stack Blog</h2>
      </div>
    </>
  )
}

export default HomePage
