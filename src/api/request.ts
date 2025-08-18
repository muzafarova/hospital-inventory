export async function request<T>(
  path: string,
  options?: {
    method?: 'GET' | 'POST' | 'DELETE'
    data?: object
    query?: Record<string, string | number>
  },
): Promise<T> {
  const url = new URL(path, window.location.origin)
  if (options?.query) {
    for (const param in options?.query) {
      url.searchParams.set(param, String(options?.query[param]))
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
      throw await response.json()
    }
    throw await response.text()
  }
  return await response.json()
}

export async function request1<T, U>(
  path: string,
  decoder: (data: T) => U,
  options?: {
    method?: 'GET' | 'POST' | 'DELETE'
    data?: object
    query?: Record<string, string | number>
  },
): Promise<U> {
  const url = new URL(path, window.location.origin)
  if (options?.query) {
    for (const param in options?.query) {
      url.searchParams.set(param, String(options?.query[param]))
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
    }
  }

  const result = (await response.json()) as { data: T }
  return decoder(result.data)
}
