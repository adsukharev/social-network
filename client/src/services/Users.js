import api from './api.js';

class UsersService {

    static fetchUsers(token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api().get('users', {headers: {"Authorization": `Bearer ${token}`}});
                resolve(res.data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static fetchOneUser(id, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api().get(`users/${id}`, { headers: { "Authorization": `Bearer ${token}`}});
                resolve(res.data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static fetchOneUserByLogin(login, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api().get(`user_login/${login}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        withCredentials: true
                    }
                });
                resolve(res.data)

            } catch (err) {
                reject(err);
            }
        })
    }

    static addUser(client, token) {
        return api().post('users', client, {headers: {"Authorization": `Bearer ${token}`}});
    }

    static deleteUser(id, token) {
        return api().delete(`users/${id}`);
    }

    static updateUser(id, data, token) {
        return api().put(`users/${id}`, data, {headers: {"Authorization": `Bearer ${token}`}});
    }

    static fakeUser(id, token) {
        return api().post(`fake/${id}`, '',{headers: {"Authorization": `Bearer ${token}`}});
    }

    static fetchRating(token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api().get(`rating`, { headers: { "Authorization": `Bearer ${token}`}});
                resolve(res.data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static searchRecommend(token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api().get(`search`, { headers: { "Authorization": `Bearer ${token}`}});
                resolve(res.data)
            } catch (err) {
                reject(err);
            }
        })
    }

    // static searchDetailed(user, token) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const res = api().post('search', user, {headers: {"Authorization": `Bearer ${token}`}});
    //             console.log(res.data);
    //             resolve(res)
    //         } catch (err) {
    //             reject(err);
    //         }
    //     })
    // }
    static searchDetailed(user, token) {
        return  api().post('search', user, {headers: {"Authorization": `Bearer ${token}`}});

    }

}

export default UsersService;
