export async function request<T>(
  path: string,
  options?: {
    method?: 'GET' | 'POST'
    data?: object
    query?: Record<string, string | number>
  },
): Promise<T> {
  const url = new URL(path, window.location.origin)
  if (options?.query) {
    for (const param in options?.query) {
      url.searchParams.set(param, String(options?.query[param]))
    }
    console.log(url)
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
