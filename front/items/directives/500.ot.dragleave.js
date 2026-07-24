// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-dragleave',
        icon: 'drag_indicator',
        name: 'Dragleave',
        description: 'Runs when a drag leaves the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-dragleave': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-dragleave',
                property: 'otDragleave'
            }, data, compile, node);
        }
    });
});
