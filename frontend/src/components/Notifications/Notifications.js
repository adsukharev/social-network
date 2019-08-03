import React from 'react';
import {Message, Grid} from 'semantic-ui-react';

export default function Notification() {
    return (
        <div>
            <Grid divided="vertically">
                <Grid.Row columns={3}>
                    <Grid.Column/>
                    <Grid.Column>
                        <p/>
                        <Message>
                            <Message.Header>New like</Message.Header>
                            <p>
                                <b>Jane</b> liked your.
                            </p>
                        </Message>
                        <Message>
                            <Message.Header>New message</Message.Header>
                            <p>
                                <b>Tolik</b> left you a message.
                            </p>
                        </Message>
                        <Message>
                            <Message.Header>New view</Message.Header>
                            <p>
                                <b>Tolik</b> viewed your page.
                            </p>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}