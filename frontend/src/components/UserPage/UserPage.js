import React, {Fragment, useState, useEffect, useContext} from 'react';
import defaultImage from '../../images/image.png';
import {Button, Card, Form, Header, Image, Input, Modal, Select, Statistic, Grid} from 'semantic-ui-react'
import jwtDecode from 'jwt-decode';
import {UserContext} from "../../contexts/UserContext";
import api from "../../api";
import { PortalWithState } from 'react-portal';
import EditProfile from "./EditProfile";


export default function ChangeProfileModal(props) {
  const { userInfo, isLoaded, token, changed } = useContext(UserContext);
  const [myPage, setMyPage] = useState(false);
  const [thisUser, setThisUser] = useState(userInfo);
  const [changedAvatar, setChangedAvatar] = useState(false);
  useEffect(() => {
    const getInfoAboutUser = async () => {
      console.log(props.location.pathname.substring(1));
      await api().get(props.location.pathname.substring(1), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then((data) => {
          setThisUser(data.data);
          if(data.data.user_id === token.identity) {
            setMyPage(true);
            pushHistory();
          } else {
            setMyPage(false);
          }
        })
        .catch(e => {
          console.log(e);
          alert("Что-то пошло не так!");
        })
    };
    if (isLoaded) {
      getInfoAboutUser();
    }
  }, [isLoaded, changedAvatar, changed, props.location.pathname]);

  const pushHistory = async () => {
    await api().post(`history${props.location.pathname.substring(6)}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((data) => {
      console.log(data);
      alert('Ваше посещение внесено в историю!!');
    })
      .catch((e) => {
        console.log(e);
        alert('OOps!!')
      })
  };

  const setUnLikeToUSer = async () => {
    await api().delete(`likes${props.location.pathname.substring(6)}`,{}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((data) => {
        console.log(data);
        alert('Дизлайк поставлен!');
      })
      .catch((e) => {
        console.log(e);
        alert('OOps!!')
      })
  };

  const setLikeToUSer = async () => {
    await api().post(`likes${props.location.pathname.substring(6)}`,{}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then((data) => {
        console.log(data);
        alert('Лайк поставлен!');
      })
      .catch((e) => {
        console.log(e);
        alert('OOps!!')
      })
  };
  const setFakeToUser = async () => {
     await api().post(`fake/${props.location.pathname.substring(6)}`)
       .then((data) => {
         console.log(data);
         alert('Вы пожаловались на этого пользователя!');
       })
       .catch((e) => {
         console.log(e);
         alert('OOps!!')
       })
  };
  return (
    isLoaded && thisUser && <Fragment>
      <div className="userpage-container">
        <div className="userpage-avatar-container">
          {thisUser.avatar ?
          <Image className="userpage-avatar" src={thisUser.avatar[0]}/>
          : <Image className="userpage-avatar" src={defaultImage}/>}
          {myPage ?
            <Fragment>
              <PortalWithState closeOnEsc>
                {({ openPortal, closePortal, portal }) => (
                  <React.Fragment>
                    <Button className="userpage-avatar-container-button" basic color='green' content='Изменить инфо' onClick={openPortal}/>
                    {portal(<EditProfile
                      {...props}
                      closeModalWindow={closePortal}
                    />)}
                  </React.Fragment>
                )}
              </PortalWithState>
            </Fragment> : null}
          {!myPage ? <Button className="userpage-avatar-container-button" basic color='pink' content='Нравится' onClick={setLikeToUSer} /> : null}
          {!myPage ? <Button className="userpage-avatar-container-button" basic color='pink' content='Не нравится' onClick={setUnLikeToUSer} /> : null}
          {!myPage ? <Button className="userpage-avatar-container-button"  basic color='yellow' content='Пожаловаться' onClick={setFakeToUser}/> : null}
          <h2>{thisUser.sumlikes}</h2>

      </div>
        <div className="userpage-information-container">
          <h1>Инфо о юзере</h1>
          {thisUser.email ? <div className="userpage-information-section">
          <p>Email:</p><p>{thisUser.email}</p>
          </div> : null}
          {thisUser.login ? <div className="userpage-information-section">
            <p>Логин:</p><p>{thisUser.login}</p>
          </div> : null}
          {thisUser.user_name ? <div className="userpage-information-section">
            <p>Имя:</p><p>{thisUser.user_name}</p>
          </div> : null}
          {thisUser.age ? <div className="userpage-information-section">
            <p>Возраст:</p><p>{thisUser.age}</p>
          </div> : null}
          {thisUser.sex ? <div className="userpage-information-section">
            <p>Пол:</p><p>{thisUser.sex === 'male' ? 'Мужской' : 'Женский'}</p>
          </div> : null}
          {thisUser.preferences ? <div className="userpage-information-section">
            <p>Предпочтения:</p><p>{thisUser.preferences === 'homo' ? "Гомосексуал" : thisUser.preferences === 'getero' ? "Гетеросексуал" : 'Бисексуал' }</p>
          </div> : null}
          {thisUser.bio ? <div className="userpage-information-section">
            <p>О себе:</p><p>{thisUser.bio}</p>
          </div> : null}
          {thisUser.sumLikes ? <div className="userpage-information-section">
            <p>Количество лайков:</p><p>{thisUser.sumLikes}</p>
          </div> : null}
          {thisUser.history ? <div className="userpage-information-section">
            <p>История посещений:</p><p>{thisUser.history}</p>
          </div> : null}
          {thisUser.likes ? <div className="userpage-information-section">
            <p>История лайков:</p><p>{thisUser.likes}</p>
          </div> : null}
          {thisUser.tags ? <div className="userpage-information-section">
            <p>Тэги:</p><p>{thisUser.tags}</p>
          </div> : null}
          <div className="userpage-information-section">
            <p>Уведомления:</p><p>{thisUser.notification ? 'Включены' : "Отключены"}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
