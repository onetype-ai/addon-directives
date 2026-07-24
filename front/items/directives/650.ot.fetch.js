// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-fetch',
        icon: 'cloud_download',
        name: 'Fetch',
        description: 'Fetch data from a url and bind the state of the call into the data.',
        trigger: 'node',
        order: 650,
        strict: false,
        tag: 'ot-fetch',
        attributes: {
            'get': {
                type: 'string',
                description: 'The endpoint to fetch, the short spelling.'
            },
            'endpoint': {
                type: 'string',
                description: 'The endpoint to fetch when get is not written.'
            },
            'url': {
                type: 'string',
                description: 'The full url to fetch when neither get nor endpoint is written.'
            },
            'bind': {
                type: 'string',
                value: 'fetch',
                description: 'The data key that carries the state of the call.'
            },
            'params': {
                type: 'string',
                description: 'Query parameters, json or an expression that resolves to an object.'
            },
            'on-success': {
                type: 'string',
                description: 'Expression that resolves to the handler of a good response.'
            },
            'on-error': {
                type: 'string',
                description: 'Expression that resolves to the handler of a failure.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.fetch', data, compile, node);
        }
    });
});
