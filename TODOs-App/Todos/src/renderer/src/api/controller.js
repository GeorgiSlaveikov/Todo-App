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

  export async function readLocalJsonFile(filePath) {
    try {
      const data = await window.electronAPI.readJsonFile(filePath);
      console.log("controller data read before check: " + data);
      if (data === null || (typeof data === 'object' && Object.keys(data).length === 0)) {
        console.log("empty file");
        return [];
      } 
      console.log("file with objects");
      return data;
    } catch (err) {
      console.error("Local file read error:", err);
      return [];
    }
  }

  export async function writeToJsonFile(path, data) {
    try {
      const jsonData = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      const result = await window.electronAPI.writeJsonFile(path, jsonData);
      return result;
    } catch (err) {
      console.error("Error writing to JSON file:", err);
      return false;
    }
  }
  
export function getUniqueId(prevId) {
    return prevId+=1;
};

