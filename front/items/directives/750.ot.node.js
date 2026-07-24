// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-node',
        icon: 'code',
        name: 'Node Mount',
        description: 'Mount a DOM node into the element.',
        trigger: 'node',
        order: 750,
        strict: false,
        attributes: {
            'ot-node': {
                type: 'string',
                required: true,
                description: 'Expression that resolves to the DOM node to mount.'
            }
        },
        code: function(data, compile, node)
        {
            this.key = () =>
            {
                const key = node.getAttribute('ot-key');

                if(key)
                {
                    return key;
                }

                if(node.hasAttribute(':ot-key'))
                {
                    return onetype.Function(node.getAttribute(':ot-key'), compile.data, false);
                }

                return null;
            };

            this.mount = (result, value) =>
            {
                const key = this.key();
                const render = result.__otRender ? result.__otRender : null;

                result.__otExternal = {
                    name: 'node',
                    key: key ? key : value,
                    render: render,
                    data: render ? render.Data : null
                };

                node.replaceWith(result);
            };

            const value = data['ot-node'].value;

            if(!value)
            {
                return;
            }

            const result = onetype.Function(value, compile.data, false);

            if(result instanceof Node)
            {
                return this.mount(result, value);
            }

            node.removeAttribute('ot-node');
            node.removeAttribute('ot-key');
            node.removeAttribute(':ot-key');
        }
    });
});
