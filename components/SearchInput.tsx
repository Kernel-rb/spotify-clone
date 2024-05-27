"use client"

import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import qs from 'query-string'
import Input from "./Input"

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const deboucedValue = useDebounce(value, 500);
    useEffect(() => {
        const query = {
            title: deboucedValue
        }
        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        })
        router.push(url)
    }, [deboucedValue , router])

  return (
      <Input
          placeholder="Search for your music..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
      />
  )
}

export default SearchInput