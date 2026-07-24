// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-click',
        icon: 'touch_app',
        name: 'Click',
        description: 'Runs when the node is clicked.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-click': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-click',
                property: 'otClick'
            }, data, compile, node);
        }
    });
});
