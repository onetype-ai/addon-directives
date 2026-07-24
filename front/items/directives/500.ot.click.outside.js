// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{

    directives.ItemAdd({
        id: 'ot-click-outside',
        icon: 'touch_app',
        name: 'Click Outside',
        description: 'Runs when a click lands outside the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-click-outside': {
                type: 'string',
                description: 'Expression that resolves to the handler for clicks outside the node.'
            }
        },
        code: function(data, compile, node)
        {
            const attribute = data['ot-click-outside'].value;

            node.setAttribute('ot-click-outside-bound', '');

            node.otClickOutside = (event) =>
            {
                const result = onetype.Function(attribute, compile.data, false);

                if(typeof result === 'function')
                {
                    result({ event });
                }
            };
        }
    });
});
