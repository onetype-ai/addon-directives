// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-dragend',
        icon: 'drag_indicator',
        name: 'Dragend',
        description: 'Runs when the drag ends wherever it ends.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-dragend': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-dragend',
                property: 'otDragend'
            }, data, compile, node);
        }
    });
});
