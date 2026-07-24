// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.leave', function(event)
{
    this.left = () =>
    {
        for(let node = event.target; node && node !== document; node = node.parentNode)
        {
            if('otMouseLeave' in node && !node.__left)
            {
                node.__left = true;
                node.otMouseLeave(event);

                return;
            }
        }
    };

    this.reset = (property, mark) =>
    {
        for(let node = event.target; node && node !== document; node = node.parentNode)
        {
            if(property in node && node[mark])
            {
                node[mark] = false;
            }
        }
    };

    if(event.type === 'mouseout')
    {
        this.left();
        this.reset('otMouseEnter', '__entered');

        return;
    }

    this.reset('otMouseLeave', '__left');
});
