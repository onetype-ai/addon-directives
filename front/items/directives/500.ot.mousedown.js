// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-mousedown',
        icon: 'touch_app',
        name: 'Mousedown',
        description: 'Runs when a button presses down on the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-mousedown': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-mousedown',
                property: 'otMousedown'
            }, data, compile, node);
        }
    });
});
