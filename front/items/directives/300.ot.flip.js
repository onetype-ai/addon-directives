// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-flip',
        icon: 'animation',
        name: 'Flip',
        description: 'Animates every move, arrival and growth of the children across re-renders.',
        trigger: 'node',
        order: 300,
        strict: false,
        attributes: {
            'ot-flip': {
                type: 'number',
                value: 320,
                description: 'How many milliseconds a move takes.'
            }
        },
        code: function(data, compile, node)
        {
            if(!directives.StoreHas('flips'))
            {
                directives.StoreSet('flips', new Set());
            }

            node.__otFlip = data['ot-flip'].value;

            directives.StoreGet('flips').add(node);
        }
    });
});
