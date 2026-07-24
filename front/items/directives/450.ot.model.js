// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-model',
        icon: 'sync_alt',
        name: 'Model',
        description: 'Binds an input to a name in the data both ways, typing writes, state draws.',
        trigger: 'node',
        order: 450,
        attributes: {
            'ot-model': {
                type: 'string',
                description: 'The name in the data the input reads and writes.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.model', 'seed', {
                node: node,
                name: data['ot-model'].value,
                data: compile.data
            });
        }
    });
});
