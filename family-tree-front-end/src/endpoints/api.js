const apiBase = "http://tranquil-lowlands-76816.herokuapp.com";

export const getFamily = async () => {
    const res = await fetch(`${apiBase}/family`);
    const resJson = await res.json();
    return resJson;
}

export const getMember = async (id) => {
    const res = await fetch(`${apiBase}/family/member?id=${id}`);
    const resJson = await res.json();
    return resJson;
}

export const createMember = async ({first_name, last_name, age, gender, relations}) => {

    const body = {
        first_name, last_name, age, gender
    }
    if (relations) {
        body.relations = relations;
    }
    console.log(body)
    const res = await fetch(`${apiBase}/family`,
    {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    }
    );
    const resJson = await res.json();
    return resJson;
}

export const deleteMember = async (id) => {
    const res = await fetch(`${apiBase}/family?id=${id}`, {
        method: "DELETE"
    });
    await res.json();
    return id;
}

export const updateMember = async ({id, first_name, last_name, age, gender, relations}) => {
    
    const body = {
        first_name, last_name, age, gender
    }
    if (relations) {
        body.relations = relations;
    }
    console.log(body)
    const res = await fetch(`${apiBase}/family?id=${id}`,
    {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    }
    );
    const resJson = await res.json();
    return resJson;
}