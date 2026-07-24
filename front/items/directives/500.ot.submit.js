// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-submit',
        icon: 'touch_app',
        name: 'Submit',
        description: 'Runs when the node submits.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-submit': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-submit',
                property: 'otSubmit'
            }, data, compile, node);
        }
    });
});
