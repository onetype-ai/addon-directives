// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.event', function(config, data, compile, node)
{
    this.payload = (event) =>
    {
        const payload = { event };

        if(config.value && event.target)
        {
            payload.value = event.target.value ? event.target.value : '';
        }

        return payload;
    };

    this.handle = (event) =>
    {
        if(config.prevent || data[config.id].modifiers.includes('prevent'))
        {
            event.preventDefault();
        }

        if(data[config.id].modifiers.includes('stop'))
        {
            event.stopPropagation();
        }

        const result = onetype.Function(data[config.id].value, compile.data, false);

        if(typeof result === 'function')
        {
            result(this.payload(event));
        }
    };

    if(config.draggable)
    {
        node.setAttribute('draggable', 'true');
    }

    node[config.property] = (event) =>
    {
        this.handle(event);
    };
});
