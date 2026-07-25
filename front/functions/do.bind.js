// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('do.bind', function(node, compile)
{
    this.grow = (value) =>
    {
        for(const name of String(value).split(/\s+/))
        {
            if(name)
            {
                node.classList.add(name);
            }
        }
    };

    this.apply = (name, value) =>
    {
        if(value === true)
        {
            return node.setAttribute(name, '');
        }

        if(name === 'class' && typeof value === 'string')
        {
            return this.grow(value);
        }

        if(typeof value === 'string' || typeof value === 'number')
        {
            return node.setAttribute(name, value);
        }

        node.removeAttribute(name);
    };

    this.bind = (attribute) =>
    {
        const name = attribute.name.substring(1);

        try
        {
            this.apply(name, onetype.Function(attribute.value, compile.data, false));
        }
        catch(error)
        {
            const context = {
                tag: node.tagName.toLowerCase(),
                attribute: name,
                reason: error.message,
                expression: attribute.value
            };

            onetype.Error(500, '<:tag:> :attribute:: :reason:', context);
        }

        node.removeAttribute(attribute.name);
    };

    if(node.nodeType !== Node.ELEMENT_NODE || !node.__attributes)
    {
        return;
    }

    for(const attribute of node.__attributes)
    {
        if(attribute.name.startsWith(':'))
        {
            this.bind(attribute);
        }
    }
});
