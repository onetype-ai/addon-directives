// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-double-click',
        icon: 'touch_app',
        name: 'Double Click',
        description: 'Runs when the node is clicked twice.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-double-click': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-double-click',
                property: 'otDoubleClick'
            }, data, compile, node);
        }
    });
});
