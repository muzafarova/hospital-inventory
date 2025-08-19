export async function request<T, U>(
  path: string,
  decoder: (data: T) => U,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: object
    query?: Record<string, string | number>
  },
): Promise<U> {
  const url = new URL(path, window.location.origin)
  if (options?.query) {
    for (const param in options?.query) {
      const value = String(options?.query[param])
      if (value !== '') {
        url.searchParams.set(param, value)
      }
    }
  }

  const body = options?.data ? JSON.stringify(options.data) : undefined

  const response = await fetch(url, {
    method: options?.method || 'GET',
    headers: { 'Content-Type': 'application/json' },
    body,
    credentials: 'include', // Include cookies for session
  })
  if (!response.ok) {
    if (response.headers.get('Content-type') === 'application/json') {
      const { error: errorMessage } = (await response.json()) as { error: string }
      throw new Error(errorMessage)
    } else {
      throw new Error('Unexpected response content type')
    }
  }

  const result = (await response.json()) as { data: T }
  return decoder(result.data)
}
