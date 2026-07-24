// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-mouse-enter',
        icon: 'touch_app',
        name: 'Mouse Enter',
        description: 'Runs when the pointer enters the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-mouse-enter': {
                type: 'string',
                description: 'Expression that resolves to the handler when the pointer enters the node.'
            }
        },
        code: function(data, compile, node)
        {
            const attribute = data['ot-mouse-enter'].value;
            const modifiers = data['ot-mouse-enter'].modifiers;

            node.otMouseEnter = (event) =>
            {
                if(modifiers && modifiers.length)
                {
                    if(modifiers.includes('prevent')) event.preventDefault();
                    if(modifiers.includes('stop')) event.stopPropagation();
                }

                const result = onetype.Function(attribute, compile.data, false);

                if(typeof result === 'function')
                {
                    result({ event });
                }
            };
        }
    });

});
