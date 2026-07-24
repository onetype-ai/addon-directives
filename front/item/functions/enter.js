// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.enter', function(event)
{
    for(let node = event.target; node && node !== document; node = node.parentNode)
    {
        if('otMouseEnter' in node && !node.__entered)
        {
            node.__entered = true;
            node.otMouseEnter(event);

            return;
        }
    }
});
