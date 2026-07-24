// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-mouse-leave',
        icon: 'touch_app',
        name: 'Mouse Leave',
        description: 'Runs when the pointer leaves the node.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-mouse-leave': {
                type: 'string',
                description: 'Expression that resolves to the handler when the pointer leaves the node.'
            }
        },
        code: function(data, compile, node)
        {
            const attribute = data['ot-mouse-leave'].value;
            const modifiers = data['ot-mouse-leave'].modifiers;

            node.otMouseLeave = (event) =>
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
