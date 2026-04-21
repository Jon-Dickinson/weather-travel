updated to axios

```
export async function apiClient<T>(baseUrl: string, endpoint: string, params: Record<string, any>): Promise<T> {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${baseUrl}${endpoint}?${queryString}`);
  if (!res.ok) throw new Error(`API Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}
```