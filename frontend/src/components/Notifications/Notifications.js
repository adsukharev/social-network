import React from 'react'
import { Feed } from 'semantic-ui-react'
import imageSrc from '../../images/elliot.jpg';

const Notifications = () => (
    <Feed style={{ width: "50%", margin: "auto"}}>
        <Feed.Event>
            <Feed.Label image={imageSrc} />
            <Feed.Content>
                <Feed.Date>Сегодня</Feed.Date>
                <Feed.Summary>
                     <a>Jenny Hess</a> посетил Вашу страницу.
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
        <Feed.Event>
            <Feed.Label image={imageSrc} />
            <Feed.Content>
                <Feed.Date>3 days ago</Feed.Date>
                <Feed.Summary>
                    <a>Jenny Hess</a> оценил Ваш профиль.
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
        <Feed.Event>
            <Feed.Label image={imageSrc} />
            <Feed.Content>
                <Feed.Date>3 days ago</Feed.Date>
                <Feed.Summary>
                    <a>Jenny Hess</a> оценил Ваш профиль.
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
        <Feed.Event>
            <Feed.Label image={imageSrc} />
            <Feed.Content>
                <Feed.Date>3 days ago</Feed.Date>
                <Feed.Summary>
                    <a>Jenny Hess</a> оценил Ваш профиль.
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
    </Feed>
)

export default Notifications;
