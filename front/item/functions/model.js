// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.model', function(phase, carried)
{
    this.read = (data, name) =>
    {
        return name.split('.').reduce((branch, step) => branch?.[step], data);
    };

    this.write = (data, name, value) =>
    {
        const steps = name.split('.');
        const last = steps.pop();
        const branch = steps.reduce((walked, step) => walked?.[step], data);

        if(branch)
        {
            branch[last] = value;
        }
    };

    this.draw = (node, value) =>
    {
        if(node.type === 'checkbox')
        {
            node.checked = Boolean(value);

            return;
        }

        if(value !== undefined && value !== null && node.value !== String(value))
        {
            node.value = value;
        }
    };

    this.seed = () =>
    {
        const { node, name, data } = carried;

        node.__otModel = {
            name: name,
            data: data
        };

        this.draw(node, this.read(data, name));
    };

    this.taken = (node) =>
    {
        if(node.type === 'checkbox')
        {
            return node.checked;
        }

        return node.type === 'number' ? Number(node.value) : node.value;
    };

    this.pour = () =>
    {
        for(let node = carried.target; node && node !== document; node = node.parentNode)
        {
            if(!node.__otModel)
            {
                continue;
            }

            this.write(node.__otModel.data, node.__otModel.name, this.taken(node));

            return;
        }
    };

    phase === 'seed' ? this.seed() : this.pour();
});
