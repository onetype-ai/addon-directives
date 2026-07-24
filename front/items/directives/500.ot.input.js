// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-input',
        icon: 'touch_app',
        name: 'Input',
        description: 'Runs as the node value types along.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-input': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-input',
                property: 'otInput',
                value: true
            }, data, compile, node);
        }
    });
});
