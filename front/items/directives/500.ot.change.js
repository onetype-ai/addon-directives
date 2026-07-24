// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-change',
        icon: 'touch_app',
        name: 'Change',
        description: 'Runs when the node value settles.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-change': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-change',
                property: 'otChange',
                value: true
            }, data, compile, node);
        }
    });
});
