// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-mouse-move',
        icon: 'touch_app',
        name: 'Mouse Move',
        description: 'Runs as the pointer moves over the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-mouse-move': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-mouse-move',
                property: 'otMouseMove'
            }, data, compile, node);
        }
    });
});
