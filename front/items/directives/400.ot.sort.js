// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-sort',
        icon: 'swap_vert',
        name: 'Sort',
        description: 'Drag the repeated node to reorder the array it was born from, live while dragging.',
        trigger: 'node',
        order: 400,
        strict: false,
        attributes: {
            'ot-sort': {
                type: 'string',
                description: 'The name of the array that reorders.'
            },
            'ot-sorted': {
                type: 'string',
                description: 'Expression that resolves to the handler called when a drag lands in a new order.'
            }
        },
        code: function(data, compile, node)
        {
            if(!data['ot-sort'].value)
            {
                return;
            }

            node.setAttribute('draggable', 'true');

            node.__otSort = {
                name: data['ot-sort'].value,
                data: compile.data,
                sorted: data['ot-sorted'].value
            };
        }
    });
});
