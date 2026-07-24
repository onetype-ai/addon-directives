// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-keydown',
        icon: 'touch_app',
        name: 'Keydown',
        description: 'Runs when a key presses down inside the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-keydown': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-keydown',
                property: 'otKeydown',
                value: true
            }, data, compile, node);
        }
    });
});
