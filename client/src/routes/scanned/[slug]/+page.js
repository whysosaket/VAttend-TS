import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (params.slug) {
    return {
      link: params.slug,
    };
  } else throw error(404, "Not found");
}
