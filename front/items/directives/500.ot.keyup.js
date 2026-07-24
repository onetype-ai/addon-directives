// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-keyup',
        icon: 'touch_app',
        name: 'Keyup',
        description: 'Runs when a key lifts inside the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-keyup': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-keyup',
                property: 'otKeyup',
                value: true
            }, data, compile, node);
        }
    });
});
