const HOST = import.meta.env.VITE_HOST;

export async function POST({request}) {
    const {eid, password} = await request.json();
    console.log(`${HOST}/api/auth/login`);
    const response = await fetch(`${HOST}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            employee_id: eid,
            password: password,
        }),
    });
    return response;
}

// no no no no