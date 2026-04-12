export const fetcher = ([url, token]) =>
  fetch(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => {
    if (res.status === 401) {
      sessionStorage.removeItem("token")
      window.location.replace("/login")
      throw new Error("Session expired")
    }
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return res.json()
  })

