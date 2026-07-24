// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-lazy',
        icon: 'hourglass_empty',
        name: 'Lazy',
        description: 'Holds the content of the node back until it approaches the viewport.',
        trigger: 'node',
        order: 200,
        attributes: {
            'ot-lazy': {
                type: 'string',
                description: 'A mark of the held content, unique within the render.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.lazy', data['ot-lazy'].value, compile, node);
        }
    });
});
