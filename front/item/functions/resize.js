// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.resize', function(phase, event)
{
    const cursor = {
        left: 'col-resize',
        right: 'col-resize',
        top: 'row-resize',
        bottom: 'row-resize'
    };

    if(!directives.StoreHas('resize'))
    {
        directives.StoreSet('resize', {
            active: null,
            hovered: null
        });
    }

    const state = directives.StoreGet('resize');

    this.measure = (event) =>
    {
        const along = (edge, base, moved, grow) =>
        {
            return edge === base ? grow - moved : grow + moved;
        };

        const { config, edge } = state.active;
        const width = along(edge, 'left', event.clientX - state.active.x, state.active.width);
        const height = along(edge, 'top', event.clientY - state.active.y, state.active.height);

        return {
            width: Math.min(config.max, Math.max(config.min, width)),
            height: Math.min(config.max, Math.max(config.min, height))
        };
    };

    this.hover = (event) =>
    {
        const match = directives.Fn('item.resize.find', event);

        document.body.style.cursor = match ? cursor[match.edge] : '';

        if(state.hovered && state.hovered !== match?.node)
        {
            state.hovered.classList.remove('ot-resize-hover');
            state.hovered = null;
        }

        if(match && state.hovered !== match.node)
        {
            state.hovered = match.node;
            state.hovered.classList.add('ot-resize-hover');
        }
    };

    this.report = (event, callback) =>
    {
        const { node, edge } = state.active;

        if(callback)
        {
            callback({
                event,
                node,
                edge,
                width: node.offsetWidth,
                height: node.offsetHeight
            });
        }
    };

    this.drag = (event) =>
    {
        const { node, config, edge } = state.active;
        const sized = this.measure(event);

        if(edge === 'left' || edge === 'right')
        {
            node.style.width = sized.width + 'px';
        }

        if(edge === 'top' || edge === 'bottom')
        {
            node.style.height = sized.height + 'px';
        }

        this.report(event, config.onResizing);
    };

    this.grab = (event) =>
    {
        const match = directives.Fn('item.resize.find', event);

        if(!match)
        {
            return;
        }

        event.preventDefault();

        const box = match.node.getBoundingClientRect();

        state.active = {
            ...match,
            x: event.clientX,
            y: event.clientY,
            width: box.width,
            height: box.height
        };

        document.body.style.cursor = cursor[match.edge];
        document.body.style.userSelect = 'none';
        match.node.classList.add('ot-resize-move');
    };

    this.release = (event) =>
    {
        if(!state.active)
        {
            return;
        }

        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        state.active.node.classList.remove('ot-resize-move');

        this.report(event, state.active.config.onResize);

        state.active = null;
    };

    if(phase === 'grab')
    {
        return this.grab(event);
    }

    if(phase === 'move')
    {
        return state.active ? this.drag(event) : this.hover(event);
    }

    this.release(event);
});
