// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-show',
        icon: 'visibility',
        name: 'Show',
        description: 'Toggle element visibility with CSS display property. Hides elements when condition is false without removing from DOM.',
        trigger: 'node',
        order: 110,
        attributes: {
            'ot-show': {
                type: 'string',
                description: 'The condition, the node shows when it holds.'
            }
        },
        code: function(data, compile, node)
        {
            if(!onetype.Function(data['ot-show'].value, compile.data, false))
            {
                node.style.display = 'none';
            }
            else if(node.style.display === 'none')
            {
                node.style.display = '';
            }
        }
    });
});
