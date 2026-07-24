// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-blur',
        icon: 'touch_app',
        name: 'Blur',
        description: 'Runs when the node loses focus.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-blur': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-blur',
                property: 'otBlur',
                value: true
            }, data, compile, node);
        }
    });
});
