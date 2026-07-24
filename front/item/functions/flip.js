// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.flip', function(phase)
{
    this.snapshot = (container) =>
    {
        const rects = new Map();

        for(const child of container.children)
        {
            rects.set(child, child.getBoundingClientRect());
        }

        container.__otFlipRects = rects;
    };

    this.arrive = (child, duration) =>
    {
        const frames = [{
            opacity: 0,
            transform: 'scale(.92)'
        }, {
            opacity: 1,
            transform: 'none'
        }];

        child.animate(frames, {
            duration: duration,
            easing: 'cubic-bezier(.2, .8, .2, 1)'
        });
    };

    this.travel = (child, before, duration) =>
    {
        const now = child.getBoundingClientRect();
        const moveX = before.left - now.left;
        const moveY = before.top - now.top;

        if(Math.abs(moveX) < 1 && Math.abs(moveY) < 1)
        {
            return;
        }

        const frames = [{
            transform: 'translate(' + moveX + 'px, ' + moveY + 'px)'
        }, {
            transform: 'none'
        }];

        child.animate(frames, {
            duration: duration,
            easing: 'cubic-bezier(.2, .8, .2, 1)'
        });
    };

    this.play = (container) =>
    {
        const rects = container.__otFlipRects;

        if(!rects)
        {
            return;
        }

        for(const child of container.children)
        {
            const before = rects.get(child);

            before ? this.travel(child, before, container.__otFlip) : this.arrive(child, container.__otFlip);
        }

        container.__otFlipRects = null;
    };

    this.sweep = () =>
    {
        for(const container of flips)
        {
            if(!container.isConnected)
            {
                flips.delete(container);

                continue;
            }

            phase === 'snapshot' ? this.snapshot(container) : this.play(container);
        }
    };

    if(!directives.StoreHas('flips'))
    {
        return;
    }

    const flips = directives.StoreGet('flips');

    this.sweep();
});
