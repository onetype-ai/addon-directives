// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('do.dispatch', function(event, property)
{
    for(let node = event.target; node && node !== document; node = node.parentNode)
    {
        if(property in node)
        {
            node[property](event);

            return;
        }
    }
});
