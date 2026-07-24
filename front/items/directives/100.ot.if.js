// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-if',
        icon: 'rule',
        name: 'If',
        description: 'Conditionally render elements based on expressions. Removes elements from DOM when condition is false.',
        trigger: 'node',
        order: 100,
        strict: false,
        attributes: {
            'ot-if': {
                type: 'string',
                description: 'The condition, the node stays when it holds.'
            }
        },
        code: function(data, compile, node)
        {
            const expression = data['ot-if'].value;
            const result = onetype.Function(expression, compile.data, false);

            if (!result)
            {
                const placeholder = document.createComment('ot-if:' + compile.identifier);
                node.replaceWith(placeholder);
                return false;
            }
        }
    });
});
