// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-focus',
        icon: 'touch_app',
        name: 'Focus',
        description: 'Runs when the node gains focus.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-focus': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-focus',
                property: 'otFocus',
                value: true
            }, data, compile, node);
        }
    });
});
