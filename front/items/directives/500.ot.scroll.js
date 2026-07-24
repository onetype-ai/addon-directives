// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-scroll',
        icon: 'touch_app',
        name: 'Scroll',
        description: 'Runs as the node scrolls.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-scroll': {
                type: 'string',
                description: 'Expression that resolves to the handler of the event.'
            }
        },
        code: function(data, compile, node)
        {
            directives.Fn('item.event', {
                id: 'ot-scroll',
                property: 'otScroll'
            }, data, compile, node);
        }
    });
});
