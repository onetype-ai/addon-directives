// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.resize.find', function(event)
{
    const zone = 6;

    this.hit = (node, edge) =>
    {
        const box = node.getBoundingClientRect();
        const distance = {
            left: event.clientX - box.left,
            right: box.right - event.clientX,
            top: event.clientY - box.top,
            bottom: box.bottom - event.clientY
        };

        return edge in distance ? distance[edge] <= zone : false;
    };

    for(let node = event.target; node && node !== document; node = node.parentNode)
    {
        if(!node.otResizeConfig)
        {
            continue;
        }

        const edge = node.otResizeConfig.edge.find((edge) => this.hit(node, edge));

        return edge ? { node, config: node.otResizeConfig, edge } : null;
    }

    return null;
});
