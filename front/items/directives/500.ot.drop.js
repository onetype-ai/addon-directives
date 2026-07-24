// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-drop',
        icon: 'drag_indicator',
        name: 'Drop',
        description: 'Runs when a drag drops on the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-drop': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-drop',
                property: 'otDrop',
                prevent: true
            }, data, compile, node);
        }
    });
});
