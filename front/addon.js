// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

const directives = onetype.Addon('directives', (addon) =>
{
    addon.Field('id', {
        type: 'string',
        required: true,
        description: 'The attribute name of the directive, like ot-if.'
    });

    addon.Field('icon', {
        type: 'string',
        value: 'code',
        description: 'The material icon name of the directive.'
    });

    addon.Field('name', {
        type: 'string',
        value: '',
        description: 'Human name of the directive.'
    });

    addon.Field('description', {
        type: 'string',
        value: '',
        description: 'What the directive does, one sentence.'
    });

    addon.Field('trigger', {
        type: 'string',
        value: 'node',
        options: ['before', 'node', 'after'],
        description: 'When the directive runs in the compile walk.'
    });

    addon.Field('order', {
        type: 'number',
        value: 1,
        description: 'Run order among directives on the same node, lower runs first.'
    });

    addon.Field('code', {
        type: 'function',
        description: 'The body of the directive, runs with the matched node.'
    });

    addon.Field('strict', {
        type: 'boolean',
        value: true,
        description: 'Whether every declared attribute must be present for the directive to fire.'
    });

    addon.Field('tag', {
        type: 'string',
        description: 'Tag name the directive binds to, left out when it binds by attributes.'
    });

    addon.Field('type', {
        type: 'string',
        description: 'Node type the directive binds to, 3 for text nodes, left out for elements.'
    });

    addon.Field('attributes', {
        type: 'json',
        value: {},
        description: 'The attributes the directive reads, each with its type.'
    });
});
