 import { useState, useEffect } from "react"

export const useFetch = (url, method = "GET", condition) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [option, setOption] = useState(null);
  const token = localStorage.getItem('key')

  const  postData = (postData) => {
    if (token){
      setOption({
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(postData)
      })

    } else{
      
      setOption({
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
      })
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOption) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { ...fetchOption ,signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    if(method === "GET"){
      fetchData()
    }
    if( method === "POST" && option){
      fetchData(option)
    }

    return () => {
      controller.abort()
    }

  }, [url, option, method])

  return { data, isPending, error, postData }
}