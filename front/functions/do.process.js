// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('do.process', function(trigger, compile, node)
{
    this.ready = () =>
    {
        if(node.nodeType === 3)
        {
            return true;
        }

        if(node.nodeType !== 1)
        {
            return false;
        }

        const tag = node.tagName.toLowerCase();

        if(!node.attributes.length && !tag.includes('-') && tag !== 'slot' && tag !== 'render')
        {
            return false;
        }

        this.remember();

        return true;
    };

    this.remember = () =>
    {
        if(!node.attributes.length || node.__attributes)
        {
            return;
        }

        node.__attributes = Array.from(node.attributes).map((attr) =>
        {
            return {
                name: attr.name,
                lowerName: attr.name.toLowerCase(),
                value: attr.value,
                original: attr
            };
        });
    };

    this.skips = (directive) =>
    {
        if(directive.trigger !== trigger)
        {
            return true;
        }

        if(node.nodeType === 3 && directive.type !== '3')
        {
            return true;
        }

        return !directives.StoreGet('fn.match')(directive, node);
    };

    this.gone = (directive) =>
    {
        return directive.trigger !== 'after'
            && !node.parentNode
            && !node.isConnected;
    };

    this.apply = (directive) =>
    {
        try
        {
            const attributes = directives.StoreGet('fn.data')(directive.attributes, node, compile);

            return directive.code.call({}, attributes, compile, node);
        }
        catch(error)
        {
            const tag = node.tagName ? node.tagName.toLowerCase() : 'text';
            const name = directive.item.Get('id');

            onetype.Error(500, '<:tag:> directive ":name:" — :reason:', { tag, name, reason: error.message });
        }
    };

    this.stops = (directive) =>
    {
        if(this.gone(directive))
        {
            return true;
        }

        if(this.apply(directive) === false)
        {
            return true;
        }

        return this.gone(directive);
    };

    this.walk = () =>
    {
        for(const directive of directives.StoreGet('sorted'))
        {
            if(this.skips(directive))
            {
                continue;
            }

            if(this.stops(directive))
            {
                break;
            }
        }

        this.finish();
    };

    this.finish = () =>
    {
        if(node.isConnected || node.parentNode)
        {
            directives.StoreGet('fn.attributes')(node, compile);
        }
    };

    if(!node)
    {
        return;
    }

    directives.Fn('do.prepare');

    if(this.ready())
    {
        this.walk();
    }
});
