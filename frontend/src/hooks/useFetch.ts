/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { formatError } from '~/api'
import { useAppStore } from '~/stores/app/app.store'

const useFetch = <T>(
  fetchFunction: () => Promise<AxiosResponse<T>>,
  ...args: any
): [T | null, boolean, string | null] => {
  const reFetch = useAppStore((state) => state.isRefecth)
  const [response, setResponse] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const memoizedFetchFunction = useCallback(fetchFunction, [...args])

  useEffect(() => {
    setLoading(true)
    memoizedFetchFunction()
      .then((res: AxiosResponse) => {
        setLoading(false)
        setResponse(res.data)
      })
      .catch((err) => {
        setError(formatError(err))
        setLoading(false)
      })
  }, [memoizedFetchFunction, reFetch])

  return [response as T, loading, error]
}

export default useFetch
