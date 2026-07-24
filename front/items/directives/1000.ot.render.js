// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-render',
        icon: 'code',
        name: 'Render',
        description: 'Mount a render instance from the parent context, named by the render tag.',
        trigger: 'node',
        order: 1000,
        tag: 'render',
        attributes: {
            'name': {
                type: 'string',
                description: 'The property on the parent that holds the render instance.'
            }
        },
        code: function(data, compile, node)
        {
            this.mount = (name) =>
            {
                compile.render[name].Element.__otExternal = {
                    name: 'render',
                    key: name
                };

                node.replaceWith(compile.render[name].Element);
            };

            this.missing = (name) =>
            {
                if(!name)
                {
                    onetype.Error(400, 'Render directive requires a name attribute.');
                }
                else
                {
                    onetype.Error(400, 'Render property :name: not found or is not a render instance.', { name });
                }

                node.remove();
            };

            const name = data['name'].value;

            if(name && compile.render[name] && compile.render[name].Element)
            {
                this.mount(name);
            }
            else
            {
                this.missing(name);
            }

            return false;
        }
    });
});
