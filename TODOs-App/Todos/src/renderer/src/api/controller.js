export async function fetchData(path) {
    try {
      const res = await fetch(`${path}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      return [];
    }
  };

export function getUniqueId(prevId) {
    return prevId+=1;
};

