// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-teleport',
        icon: 'open_in_new',
        name: 'Teleport',
        description: 'Renders the node at another place in the document, by default at the end of the body.',
        trigger: 'node',
        order: 1500,
        strict: false,
        attributes: {
            'ot-teleport': {
                type: 'string',
                value: 'body',
                description: 'Selector of the place the node lives at.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.teleport', data['ot-teleport'].value, compile, node);
        }
    });
});
