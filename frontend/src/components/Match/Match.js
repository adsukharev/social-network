import React, { Component } from 'react'
    import { Button, Checkbox, Form, Input, Radio, Select, TextArea, Card, Icon, CardGroup } from 'semantic-ui-react';
import eliot from '../../images/elliot.jpg';

    const options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
    ];
const extra = (
    <Card.Content extra>
        <div className='ui two buttons'>
            <Button basic color='green'>
                Approve
            </Button>
            <Button basic color='red'>
                Decline
            </Button>
        </div>
    </Card.Content>
)
    class Match extends Component {
        state = {};

        handleChange = (e, {value}) => this.setState({value});

        render() {
            const {value} = this.state;
            return (
                <div style={{ width: "50%", margin: "auto"}}>
                <Form >
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} label='First name' placeholder='First name'/>
                        <Form.Field control={Input} label='Last name' placeholder='Last name'/>
                        <Form.Field control={Select} label='Gender' options={options} placeholder='Gender'/>
                    </Form.Group>
                    <Form.Group inline>
                        <label>Quantity</label>
                        <Form.Field
                            control={Radio}
                            label='One'
                            value='1'
                            checked={value === '1'}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            control={Radio}
                            label='Two'
                            value='2'
                            checked={value === '2'}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            control={Radio}
                            label='Three'
                            value='3'
                            checked={value === '3'}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...'/>
                    <Form.Field control={Checkbox} label='I agree to the Terms and Conditions'/>
                    <Form.Field control={Button}>Submit</Form.Field>
                </Form>
                    <CardGroup>
                        <Card
                            image={ eliot }
                            header='Elliot Baker'
                            meta='Friend'
                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                            extra={extra}
                        >
                        </Card>
                        <Card
                            image={ eliot }
                            header='Elliot Baker'
                            meta='Friend'
                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                            extra={extra}
                        >
                        </Card>
                        <Card
                            image={ eliot }
                            header='Elliot Baker'
                            meta='Friend'
                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                            extra={extra}
                        >
                        </Card>
                        <Card
                        image={ eliot }
                        header='Elliot Baker'
                        meta='Friend'
                        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                        extra={extra}
                    >
                    </Card>

                    </CardGroup>
                </div>
            )
        }
    }

    export default Match;
