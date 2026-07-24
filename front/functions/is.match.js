// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('is.match', function(directive, node)
{
    this.carries = (name) =>
    {
        if(!node.__attributes)
        {
            return false;
        }

        return node.__attributes.some((attribute) =>
        {
            if(attribute.lowerName === name || attribute.lowerName === ':' + name)
            {
                return true;
            }

            return attribute.lowerName.startsWith(name + '.')
                || attribute.lowerName.startsWith(':' + name + '.');
        });
    };

    this.count = () =>
    {
        let found = 0;

        for(const name of Object.keys(directive.attributes))
        {
            if(this.carries(name.toLowerCase()))
            {
                found++;
            }
        }

        return found;
    };

    this.anchored = () =>
    {
        if(directive.tag && (!node.tagName || node.tagName.toLowerCase() !== directive.tag.toLowerCase()))
        {
            return false;
        }

        return !directive.type
            || node.nodeType.toString() === directive.type;
    };

    this.free = () =>
    {
        if(directive.trigger !== 'node')
        {
            return true;
        }

        return Boolean(directive.tag) ? true : Boolean(directive.type);
    };

    if(!this.anchored())
    {
        return false;
    }

    const total = Object.keys(directive.attributes).length;

    if(total === 0)
    {
        return this.free();
    }

    if(directive.tag)
    {
        return true;
    }

    const found = this.count();

    return directive.strict ? found === total : found > 0;
});
