import api from './api.js';

class ProfileService {

    static fetchTags(token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api().get('tags', {headers: {"Authorization": `Bearer ${token}`}});
                resolve(res.data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static addLike(id, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api().post(`likes/${id}`, '' , {headers: {"Authorization": `Bearer ${token}`}});
                resolve(res.data)

            } catch (err) {
                reject(err);
            }
        })
    }
    static addDislike(id, token) {
        return api().delete(`likes/${id}`, {headers: {"Authorization": `Bearer ${token}`}});
    }

    static deleteImage(id, token) {
        return api().delete(`images/${id}`, {headers: {"Authorization": `Bearer ${token}`}});
    }

    static addHistory(id, token) {
        return api().post(`history/${id}`, '',{headers: {"Authorization": `Bearer ${token}`}});
    }

}
export default ProfileService;
