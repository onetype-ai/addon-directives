// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-html',
        icon: 'code',
        name: 'Html',
        description: 'Fill the node with markup born from an expression.',
        trigger: 'node',
        order: 750,
        strict: true,
        type: '1',
        attributes: {
            'ot-html': {
                type: 'string',
                description: 'Expression that resolves to the markup.'
            }
        },
        code: function(data, compile, node)
        {
            this.inject = (results) =>
            {
                const paused = compile.children;

                compile.children = false;

                const compiled = compile.render.Compile(results, compile.data);
                const fragment = document.createDocumentFragment();

                while(compiled.element.firstChild)
                {
                    fragment.appendChild(compiled.element.firstChild);
                }

                node.replaceWith(fragment);

                compile.children = paused;
            };

            const html = data['ot-html'].value;

            if(!html)
            {
                return;
            }

            const results = onetype.Function(html, compile.data, false);

            if(typeof results === 'string' && results.trim())
            {
                return this.inject(results);
            }

            node.remove();
        }
    });
});
