// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-dragstart',
        icon: 'drag_indicator',
        name: 'Dragstart',
        description: 'Runs when a drag starts on the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-dragstart': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-dragstart',
                property: 'otDragstart',
                draggable: true
            }, data, compile, node);
        }
    });
});
