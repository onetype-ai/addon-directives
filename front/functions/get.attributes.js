// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('get.attributes', function(attributes, node, compile)
{
    const data = {};
    const tag = node.tagName ? node.tagName.toLowerCase() : 'text';

    this.find = (name) =>
    {
        if(!node.__attributes)
        {
            return null;
        }

        const found = node.__attributes.find((attribute) =>
        {
            if(attribute.lowerName === name || attribute.lowerName === ':' + name)
            {
                return true;
            }

            return attribute.lowerName.startsWith(name + '.')
                || attribute.lowerName.startsWith(':' + name + '.');
        });

        return found ? found : null;
    };

    this.trim = (attribute) =>
    {
        const split = attribute.name.split('.');

        if(split.length > 1)
        {
            attribute.name = split[0];
            attribute.modifiers = split.slice(1);
        }

        if(attribute.name.startsWith(':'))
        {
            attribute.dynamic = true;
            attribute.name = attribute.name.substring(1);
        }
    };

    this.shape = (name, found) =>
    {
        const attribute = {
            original: {
                name: found ? found.name : name,
                value: found ? found.value : null
            },
            name: found ? found.name : name,
            value: found ? found.value : null,
            dynamic: false,
            modifiers: []
        };

        this.trim(attribute);

        return attribute;
    };

    this.broken = (attribute, error) =>
    {
        const context = {
            tag: tag,
            attribute: attribute.name,
            reason: error.message,
            expression: attribute.original.value
        };

        onetype.Error(400, '<:tag:> :attribute: — :reason:', context);

        attribute.value = null;
    };

    this.evaluate = (attribute) =>
    {
        if(!attribute.dynamic)
        {
            return;
        }

        try
        {
            attribute.value = onetype.Function(attribute.value, compile.data, false);
        }
        catch(error)
        {
            this.broken(attribute, error);
        }
    };

    this.invalid = (attribute, error) =>
    {
        const trail = error.path && error.path.length
            ? attribute.name + '.' + error.path.join('.').replace(/\.\[/g, '[')
            : attribute.name;

        const context = {
            tag: tag,
            path: trail,
            reason: error.message
        };

        onetype.Error(400, '<:tag:> :path: — :reason:', context);

        attribute.value = null;
    };

    this.validate = (attribute, definition) =>
    {
        try
        {
            attribute.value = onetype.DataDefineOne(attribute.value, definition);
        }
        catch(error)
        {
            this.invalid(attribute, error);
        }
    };

    this.read = (name, definition) =>
    {
        const found = this.find(name.toLowerCase());
        const attribute = this.shape(name.toLowerCase(), found);

        this.evaluate(attribute);
        this.validate(attribute, definition);

        data[attribute.name] = attribute;

        if(found && node.removeAttribute)
        {
            node.removeAttribute(found.name);
            node.__attributes = node.__attributes.filter((attribute) => attribute !== found);
        }
    };

    Object.entries(attributes).forEach(([name, definition]) => this.read(name, definition));

    return data;
});
