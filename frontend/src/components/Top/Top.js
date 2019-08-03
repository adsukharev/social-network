import React from 'react'
import {Form, Card, Select, Image, Icon} from 'semantic-ui-react'

const sortOptions = [
    {key: 'tags', text: 'tags', value: 'tags'},
    {key: 'age', text: 'age', value: 'age'},
    {key: 'rating', text: 'rating', value: 'rating'},
    {key: 'city', text: 'city', value: 'city'},
]

const src = 'http://img.dailymail.co.uk/i/pix/2007/07_03/nasa1R3107_1000x1000.jpg';

export default function sortSelect() {
    return (
        <Form>
            <Form.Group unstackable widths={4}>
                <Form.Field/>
                <Select placeholder='Sort' control={Select} options={sortOptions}/>
            </Form.Group>

            <Form.Group unstackable widths={4}>
                <Form.Field/>
                <Card.Group itemsPerRow={5}>
                    <Card color='red' image={src}/>

                    <Card>
                        <Image
                            src='http://dusha.center/system/articles/images/000/000/304/medium/36860398_1954448124587546_4498033461424029696_n.jpg?1533477225'
                            wrapped
                            ui={false}/>
                        <Card.Content>
                            <Card.Header>Tolik</Card.Header>
                            <Card.Meta>
                                <span className='date'>92</span>
                            </Card.Meta>
                            <Card.Description>
                                Ufa city
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a><Icon name='top'/> Top 666</a>
                        </Card.Content>
                        <Card.Content extra>
                            <a><Icon name='like'/>22 Likes</a>
                        </Card.Content>
                    </Card>

                    <Card>
                        <Image src='https://avatarko.ru/img/kartinka/1/pozitiv_smailik.jpg' wrapped
                               ui={false}/>
                        <Card.Content>
                            <Card.Header>Ne Tolik</Card.Header>
                            <Card.Meta>
                                <span className='date'>22</span>
                            </Card.Meta>
                            <Card.Description>
                                UEFA city
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a><Icon name='top'/> Top 1</a>
                        </Card.Content>
                        <Card.Content extra>
                            <a><Icon name='like'/>922 Likes</a>
                        </Card.Content>
                    </Card>

                    <Card color='orange' image={src}/>
                    <Card color='yellow' image={src}/>
                    <Card color='olive' image={src}/>

                </Card.Group>
            </Form.Group>
        </Form>
    )
        ;
}