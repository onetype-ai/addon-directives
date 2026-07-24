// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-dragenter',
        icon: 'drag_indicator',
        name: 'Dragenter',
        description: 'Runs when a drag enters the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-dragenter': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-dragenter',
                property: 'otDragenter',
                prevent: true
            }, data, compile, node);
        }
    });
});
