// Wrapper para fetch que maneja tokens Clerk automáticamente
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Si es no autorizado, redirigir al home (Clerk va a redirigir a login)
      window.location.href = "/";
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
