// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-form',
        icon: 'send',
        name: 'Form',
        description: 'Submit the form to an endpoint or a callback and bind the state of the call into the data.',
        trigger: 'node',
        order: 660,
        strict: false,
        tag: 'ot-form',
        attributes: {
            'post': {
                type: 'string',
                description: 'The endpoint that receives the form as a post.'
            },
            'get': {
                type: 'string',
                description: 'The endpoint that receives the form as a get.'
            },
            'endpoint': {
                type: 'string',
                description: 'The endpoint when neither post nor get is written.'
            },
            'bind': {
                type: 'string',
                value: 'form',
                description: 'The data key that carries the state of the call.'
            },
            'method': {
                type: 'string',
                value: 'POST',
                description: 'The http method when the endpoint spelling does not choose one.'
            },
            'redirect': {
                type: 'string',
                description: 'The path to visit after a good response.'
            },
            '_submit': {
                type: 'function',
                description: 'Runs before the call, returning false stops it.'
            },
            '_success': {
                type: 'function',
                description: 'Runs after a good response.'
            },
            '_error': {
                type: 'function',
                description: 'Runs after a failure.'
            },
            'reset': {
                type: 'boolean',
                value: false,
                description: 'Whether the form clears after a good response.'
            },
            'stop': {
                type: 'boolean',
                value: false,
                description: 'Whether the submit stops bubbling.'
            },
            'data': {
                type: 'json',
                value: {},
                description: 'Extra data merged into the submit.'
            }
        },
        code: function(data, compile, node)
        {
            this.endpoint = () =>
            {
                if(data['post'].value)
                {
                    return data['post'].value;
                }

                return data['get'].value ? data['get'].value : data['endpoint'].value;
            };

            const get = data['get'].value;
            const config = {
                endpoint: this.endpoint(),
                bind: data['bind'].value,
                method: get ? 'GET' : data['method'].value.toUpperCase(),
                redirect: data['redirect'].value,
                onSubmit: data['_submit'].value,
                onSuccess: data['_success'].value,
                onError: data['_error'].value,
                reset: data['reset'].value,
                stop: data['stop'].value,
                data: data['data'].value
            };

            directives.Fn('item.form', config, compile, node);
        }
    });

});
