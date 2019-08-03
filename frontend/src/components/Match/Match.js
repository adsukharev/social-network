import React from 'react';
import {Grid, Form, Select} from "semantic-ui-react";

const sortOptions = [
    {key: 'tags', text: 'tags', value: 'tags'},
    {key: 'age', text: 'age', value: 'age'},
    {key: 'rating', text: 'rating', value: 'rating'},
    {key: 'city', text: 'city', value: 'city'},
]

export default function Match() {
    return (
        <div>
            <h1>Search</h1>
            <Grid divided='vertically'>
                <Grid.Row columns={4}>
                    <Grid.Column/>
                    <Grid.Column unstackable widths={4}>
                        <Select placeholder='Sort' control={Select} options={sortOptions}/>
                    </Grid.Column>
                    <Grid.Column>
                        <div className="ui icon input">
                            <input type="text" placeholder="Search users..."/>
                            <i className="inverted circular search link icon"/>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form>

                <Form.Group unstackable widths={5}>
                    <Form.Field/>
                    <Form.Field/>
                    <table className="ui celled table">
                        <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Rating</th>
                            <th>City</th>
                            <th>Tags</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><img class="ui mini circular image"
                                     src="https://lumpics.ru/wp-content/uploads/2016/12/Avatar-v-Skype.png"
                                     height="50px" width="50px"/></td>
                            <td data-label="Name">Ivan</td>
                            <td data-label="Age">25</td>
                            <td data-label="Rating">22</td>
                            <td data-label="City">Moscow</td>
                            <td data-label="Tags">Jokes, Music</td>
                        </tr>
                        <tr>
                            <td><img className="ui mini circular image"
                                     src="https://avatarko.ru/img/kartinka/1/pozitiv_smailik.jpg" height="75px"
                                     width="75px"/></td>
                            <td data-label="Name">Dasha</td>
                            <td data-label="Age">24</td>
                            <td data-label="Rating">24</td>
                            <td data-label="City">Moscow</td>
                            <td data-label="Tags">Films, Music</td>
                        </tr>
                        <tr>
                            <td><img class="ui mini circular image"
                                     src="https://avatarko.ru/img/kartinka/1/pozitiv_smailik.jpg" height="75px"
                                     width="75px"/></td>
                            <td data-label="Name">Tolik</td>
                            <td data-label="Age">126</td>
                            <td data-label="Rating">666</td>
                            <td data-label="City">Moscow</td>
                            <td data-label="Tags">OldBitches, TV</td>
                        </tr>
                        </tbody>
                    </table>
                    <Form.Field/>
                </Form.Group>
            </Form>
        </div>
    )
}

