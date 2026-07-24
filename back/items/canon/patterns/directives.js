// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import directives from '#directives/back/addon.js';

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'directives:directives',
        description: 'A directive file wraps one directives.ItemAdd in AddonReady, named by its order and id.',
        match: '/items/directives/[^/]+\\.js$',
        claims: '/items/directives/',
        pattern: 'onetype.AddonReady(\'directives\', function(directives)\n{\n    directives.ItemAdd({ __fields__ });\n});',
        assert: (context) =>
        {
            return directives.Fn('assert.canon', context);
        },
        fields: {
            id: {
                type: 'string',
                required: true,
                description: 'The attribute name of the directive, like ot-if.'
            },
            icon: {
                type: 'string',
                description: 'The material icon name of the directive.'
            },
            name: {
                type: 'string',
                required: true,
                description: 'Human name of the directive.'
            },
            description: {
                type: 'string',
                required: true,
                description: 'What the directive does, one sentence.'
            },
            trigger: {
                type: 'string',
                description: 'When the directive runs in the compile walk, before, node or after.'
            },
            order: {
                type: 'number',
                required: true,
                description: 'Run order among directives on the same node, lower runs first.'
            },
            strict: {
                type: 'boolean',
                description: 'Whether every declared attribute must be present for the directive to fire.'
            },
            tag: {
                type: 'string',
                description: 'Tag name the directive binds to, left out when it binds by attributes.'
            },
            type: {
                type: 'string',
                description: 'Node type the directive binds to, 3 for text nodes, left out for elements.'
            },
            attributes: {
                type: 'object',
                description: 'The attributes the directive reads, each a define with a type and a description.'
            },
            code: {
                type: 'function',
                required: true,
                description: 'The body of the directive, runs as (data, compile, node).'
            }
        }
    });
});
