const HOST = import.meta.env.VITE_HOST;

export const load = async (serverLoadEvent) => {
    const { fetch } = serverLoadEvent;
    const response = await fetch(`${HOST}/api/QR`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Bypass-Tunnel-Reminder": "anything",
        },
      });

    const json = await response.json();
    if(json.success){
        return { imageURL: json.imgurl, url: json.uri };
    } else {
        return { imageURL: "ERROR", url: "ERROR" };
    }
};