import React from 'react';
import { Link } from "react-router-dom";
import { Item } from 'semantic-ui-react';
import topListFake from './topListFake';

export  default function Top() {

    const topList = topListFake.map((item) => {
        return(
            <Item key={item.id}>

                <Item.Image size='tiny' src={item.img} />
                <Item.Content verticalAlign='middle'>
                    <Link to={'/user/' + item.id}>
                     <Item.Header as='a'>{item.name}</Item.Header>
                    </Link>
                </Item.Content>

            </Item>
        )
    });
    return (
        <Item.Group style={{ width: "20%", margin: "auto" }}>
            { topList }
        </Item.Group>
    )
}
