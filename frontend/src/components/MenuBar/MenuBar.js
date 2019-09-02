import React, { useContext, useEffect, useState } from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import api from '../../api';
import {UserContext} from "../../contexts/UserContext";

export default function MenuBar(props) {
    const {userInfo, isLoaded} = useContext(UserContext);
    const logout = async () => {
        await api().delete('logout', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        localStorage.clear();
        props.setLoggedIn(false);
    };
    return (
      isLoaded && <Menu vertical className='compact inverted vertical left fixed'>
          <div>
              <Menu.Item as={Link} to={`/users/${userInfo.user_id}`} name='myPage'
                         active={props.activeItem === 'myPage'}
                         onClick={props.handleItemClick}>

                  {/*<Label color='teal'>1</Label>*/}
                  Моя страница
              </Menu.Item>
              <Menu.Item as={Link} to={'/top'} name='top' active={props.activeItem === 'top'}
                         onClick={props.handleItemClick}>
                  {/*<Label>1</Label>*/}
                  Топ пользователей
              </Menu.Item>
              <Menu.Item as={Link} to={'/match'} name='match' active={props.activeItem === 'match'}
                         onClick={props.handleItemClick}>
                  {/*<Label>51</Label>*/}
                  Поиск пары
              </Menu.Item>
              <Menu.Item as={Link} to={'/recommendations'} name='recommendations'
                         active={props.activeItem === 'recommendations'}
                         onClick={props.handleItemClick}>
                  {/*<Label>51</Label>*/}
                  Рекомендации
              </Menu.Item>


              <Menu.Item as={Link} to={'/chats'} name='chat' active={props.activeItem === 'chat'}
                         onClick={props.handleItemClick}>
                  {/*<Label>1</Label>*/}
                  Чат
              </Menu.Item>


              <Menu.Item as={Link} to={'/notifications'} name='notification'
                         active={props.activeItem === 'notification'}
                         onClick={props.handleItemClick}>
                  {/*<Label>1</Label>*/}
                  Уведомления
              </Menu.Item>


              <Menu.Item as={Link} to={'/login '} name='logout'
                         onClick={async () => {
                             await logout();
                             // props.location.reload();
                         }}>
                  Выход
              </Menu.Item>
          </div>
      </Menu>
    )
}
