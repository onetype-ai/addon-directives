// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-paste',
        icon: 'touch_app',
        name: 'Paste',
        description: 'Runs when content pastes into the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-paste': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-paste',
                property: 'otPaste',
                value: true
            }, data, compile, node);
        }
    });
});
