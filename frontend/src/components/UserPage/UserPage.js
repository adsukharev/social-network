import React from 'react'
import {Button, Card, Form, Header, Image, Input, Modal, Select, Statistic, Grid} from 'semantic-ui-react'

const genderOptions = [
    {key: 'm', text: 'Man', value: 'Man'},
    {key: 'w', text: 'Woman', value: 'Woman'},
]

const ageOptions = [
    {key: '16', text: '16', value: '16'},
    {key: '17', text: '17', value: '17'},
    {key: '18', text: '18', value: '18'},
    {key: '19', text: '19', value: '19'},
    {key: '20', text: '20', value: '20'},
    {key: '21', text: '21', value: '21'},
    {key: '22', text: '22', value: '22'},
    {key: '23', text: '23', value: '23'},
    {key: '24', text: '24', value: '24'},
    {key: '25', text: '25', value: '25'},
    {key: '26', text: '26', value: '26'},
    {key: '27', text: '27', value: '27'},
    {key: '28', text: '28', value: '28'},
    {key: '29', text: '29', value: '29'},
    {key: '30', text: '30', value: '30'},
]

const cityOptions = [
    {key: 'MSC', text: 'Moscow', value: 'MSC'},
    {key: 'SPB', text: 'Saint-Petersburg', value: 'SPB'},
    {key: 'NVSB', text: 'Novosibirsk', value: 'NVSB'},
]

const orientationOptions = [
    {key: 'Bisexual', text: 'Bisexual', value: 'Bisexual'},
    {key: 'Heterosexual', text: 'Heterosexual', value: 'Heterosexual'},
    {key: 'Homosexual', text: 'Homosexual', value: 'Homosexual'},
]

export default function changeProfileModal() {
    return (
        <Form>
            <p/>
            <Modal trigger={<Button color='red'>Change</Button>}>
                <Modal.Header>Change Profile</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium'
                           src='https://clipart-db.ru/file_content/rastr/planet-009.png'/>
                    <Modal.Description>
                        <Header>Change Profile</Header>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    label='Email'
                                    control={Input}
                                    placeholder='xxx@gmail.com'
                                    required
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    label='First name'
                                    placeholder='Ivan'
                                    required
                                />
                                <Form.Field
                                    control={Input}
                                    label='Last name'
                                    placeholder='Ivanov'
                                    required
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    options={genderOptions}
                                    label={{children: 'Gender', htmlFor: 'form-select-control-gender'}}
                                    search
                                    searchInput={{id: 'form-select-control-gender'}}
                                    placeholder='man or woman'
                                    required
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    options={ageOptions}
                                    label={{children: 'Age', htmlFor: 'form-select-control-age'}}
                                    search
                                    searchInput={{id: 'form-select-control-age'}}
                                    placeholder='Your age'
                                    required
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    options={cityOptions}
                                    label={{children: 'City', htmlFor: 'form-select-control-city'}}
                                    search
                                    searchInput={{id: 'form-select-control-city'}}
                                    placeholder='Your city'
                                    required
                                />

                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Select}
                                    options={orientationOptions}
                                    label={{children: 'Orientation', htmlFor: 'form-select-control-orientation'}}
                                    search
                                    searchInput={{id: 'form-select-control-city'}}
                                    placeholder='Your orientation'
                                    required
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field className="ui right labeled left icon input">
                                    <i className="tags icon"></i>
                                    <input type="text" placeholder="Enter tags"/>
                                    <a className="ui tag label">
                                        Add Tag
                                    </a>

                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Checkbox inline label='Email notifications'/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field/>
                                <Form.Field
                                    control={Button}
                                    color='blue'
                                    content='Change'
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>

            <br/><br/><br/><br/>
            <Grid divided='vertically'>
                <Grid.Row columns={6}>
                    <Grid.Column/>
                    <Card>
                        <Image src='https://lumpics.ru/wp-content/uploads/2016/12/Avatar-v-Skype.png' wrapped
                               ui={false}/>
                        <Card.Content>
                            <Card.Header>Ivan</Card.Header>
                            <Card.Meta>
                                <span className='date'>25</span>
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                    <Grid.Column>
                        <p>Name</p>
                        <p>Last name</p>
                        <p>Age</p>
                        <p>Orientation</p>
                        <p>City</p>
                        <p>Tags</p>
                        <p><b>Rating</b></p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>Ivan</p>
                        <p>Ivanov</p>
                        <p>25</p>
                        <p>Heterosexual</p>
                        <p>Novosibirsk</p>
                        <p>#Jokes #Girls</p>
                        <p><b>92</b></p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br/><br/><br/><br/>
            <Form.Group widths='equal'>
                <Form.Field control={Button}>
                    <Statistic size='tiny' color='green'>
                        <Statistic.Label>Views</Statistic.Label>
                        <Statistic.Value><b>49</b></Statistic.Value>
                    </Statistic>
                </Form.Field>
                <Form.Field control={Button}>
                    <Statistic size='tiny' color='red'>
                        <Statistic.Label>Likes</Statistic.Label>
                        <Statistic.Value><b>42</b></Statistic.Value>
                    </Statistic>
                </Form.Field>
            </Form.Group>
        </Form>
    );
}