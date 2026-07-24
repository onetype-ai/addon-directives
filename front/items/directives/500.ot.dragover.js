// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-dragover',
        icon: 'drag_indicator',
        name: 'Dragover',
        description: 'Runs while a drag rides over the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-dragover': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-dragover',
                property: 'otDragover',
                prevent: true
            }, data, compile, node);
        }
    });
});
