import api from './api.js';

class RegistrationService {

  static signUp(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api().post('signup', data);
        resolve(res.data)
      } catch (err) {
        reject(err);
      }
    })
  }

  static signIn(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api().post('signin', data);
        resolve(res.data)
      } catch (err) {
        reject(err);
      }
    })
  }

  static forgotPassword(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = api().put(`signin`, data);
        resolve(res.data)
      } catch (err) {
        reject(err);
      }
    })
  }


  static logout(token) {
    return api().delete(`logout`, { headers: {"Authorization" : `Bearer ${token}`} });
  }

  // static oauthRedirect() {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const res = api().post('oauth', '');
  //       resolve(res.data)
  //     } catch (err) {
  //       reject(err);
  //     }
  //   })
  // }
  //
  // static oauthCallback(data) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const res = await api().get('oauth', data);
  //       resolve(res.data)
  //     } catch (err) {
  //       reject(err);
  //     }
  //   })
  // }

  static oauth(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api().post('oauth', data);
        resolve(res.data)
      } catch (err) {
        reject(err);
      }
    })
  }


}

export default RegistrationService;
