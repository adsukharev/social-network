import api from './api.js';

class ChatService {

    static fetchChats(token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api().get('chats', {headers: {"Authorization": `Bearer ${token}`}});
                resolve(res.data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static fetchChat(id, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api().get(`chats/${id}` , {headers: {"Authorization": `Bearer ${token}`}});
                resolve(res.data)
            } catch (err) {
                reject(err);
            }
        })
    }

}
export default ChatService;
