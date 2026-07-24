// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-slot',
        icon: 'input',
        name: 'Slot',
        description: 'Insert slot content, a DOM element or a compiled fragment.',
        trigger: 'node',
        order: 160,
        strict: true,
        tag: 'slot',
        attributes: {
            'name': {
                type: 'string',
                description: 'The name of the slot to insert.'
            }
        },
        code: function(data, compile, node)
        {
            this.fill = (slot) =>
            {
                if(slot.Element)
                {
                    slot.Element.__otExternal = {
                        name: 'slot',
                        key: data['name'].value
                    };

                    return node.replaceWith(slot.Element);
                }

                const merged = Object.assign({}, slot.context(), compile.render.GetData());
                const compiled = compile.render.Compile(slot.html, merged);

                node.replaceWith(...compiled.element.childNodes);
            };

            const name = data['name']?.value;
            const slot = name ? compile.render.Slots[name] : null;

            if(!slot)
            {
                return node.remove();
            }

            this.fill(slot);
        }
    });
});
