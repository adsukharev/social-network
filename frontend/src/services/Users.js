import api from './api.js';

class UsersService {

    static fetchUsers(token){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await api().get('users', { headers: {"Authorization" : `Bearer ${token}`} });
                resolve(res.data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static fetchOneUser(id, token) {
        return new Promise(async (resolve, reject) => {
            try {
            const res = await api().get(`users/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });
                resolve(res.data)

            } catch (err) {
                reject(err);
            }
        })
    }

    static addUser(client, token) {
        return  api().post('clients', client, { headers: {"Authorization" : `Bearer ${token}`} });
    }

    static deleteUser(id, token) {
        return api().delete(`clients/${id}`);
    }

    static updateUser(id, data, token) {
        return api().put(`clients/${id}`, data, { headers: {"Authorization" : `Bearer ${token}`} });
    }
}

export default UsersService;
