export  const jsonldFetch = async (data) => {
    console.log(data)
    return await fetch('http://192.168.1.81:8000/api/login', {
        method: 'POST',
        headers: {
            Accept: 'application/ld+json',
            'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify({
            password: data.password,
            username: data.username
        })
        })
        .then(async (response) => await response.json())
        .catch((error) => {
        console.error(error);
    })
}
export  const associePageFetch = async (data) => {
    return await fetch('http://192.168.1.81:8000/api/users', {
        method: 'GET',
        headers: {
            Accept: 'application/ld+json',
            'Content-Type': 'application/json',
            'authorization' :"Bearer "+data 
        }
        })
        .then((response) => response.json())
        .catch((error) => {
        console.error(error);
    })
}
export  const getScm = async (data,user) => {
    return await fetch('http://192.168.1.81:8000'+user, {
        method: 'GET',
        headers: {
            Accept: 'application/ld+json',
            'Content-Type': 'application/json',
            'authorization' :"Bearer "+data 
        }
        })
        .then((response) => response.json())
        .catch((error) => {
        console.error(error);
    })
}