import { writable } from "svelte/store";

export const progress = writable(0);
export const user = writable({
    name: "N/A",
    employeeId: "N/A",
    imageURL:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    dateAdded: "N/A",
    timeAdded: "N/A",
    admin: false,
    present: false,
    loggedIn: false,
});

export const records = writable([]);