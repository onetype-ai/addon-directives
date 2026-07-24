// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.sort', function(phase, event)
{
    this.owner = (start) =>
    {
        for(let node = start; node && node !== document; node = node.parentNode)
        {
            if(node.__otSort)
            {
                return node;
            }
        }

        return null;
    };

    this.grab = () =>
    {
        const node = this.owner(event.target);

        if(!node)
        {
            return;
        }

        const list = node.__otSort.data[node.__otSort.name];

        node.__otSort.before = list.map((row) => String(row.id)).join();

        directives.StoreSet('sorting', node);
        node.classList.add('ot-sorting');

        if(event.dataTransfer)
        {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', node.getAttribute('ot-key'));
        }
    };

    this.move = (list, fromKey, towardKey) =>
    {
        const from = list.findIndex((row) => String(row.id) === fromKey);
        const toward = list.findIndex((row) => String(row.id) === towardKey);

        if(from < 0 || toward < 0 || from === toward)
        {
            return;
        }

        const [row] = list.splice(from, 1);

        list.splice(toward, 0, row);
    };

    this.over = () =>
    {
        const active = directives.StoreHas('sorting') ? directives.StoreGet('sorting') : null;

        if(!active)
        {
            return;
        }

        const hover = this.owner(event.target);

        if(!hover || hover === active || hover.__otSort.name !== active.__otSort.name)
        {
            return;
        }

        event.preventDefault();

        this.move(active.__otSort.data[active.__otSort.name], active.getAttribute('ot-key'), hover.getAttribute('ot-key'));
    };

    this.landed = (active) =>
    {
        const settings = active.__otSort;
        const list = settings.data[settings.name];

        if(!settings.sorted || settings.before === list.map((row) => String(row.id)).join())
        {
            return;
        }

        const handler = onetype.Function(settings.sorted, settings.data, false);

        if(typeof handler === 'function')
        {
            handler({
                list: list,
                key: active.getAttribute('ot-key')
            });
        }
    };

    this.release = () =>
    {
        const active = directives.StoreHas('sorting') ? directives.StoreGet('sorting') : null;

        if(!active)
        {
            return;
        }

        active.classList.remove('ot-sorting');
        directives.StoreSet('sorting', null);

        this.landed(active);
    };

    if(phase === 'grab')
    {
        return this.grab();
    }

    if(phase === 'over')
    {
        return this.over();
    }

    this.release();
});
