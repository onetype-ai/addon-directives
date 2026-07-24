// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.outside', function(event)
{
    for(const node of document.querySelectorAll('[ot-click-outside-bound]'))
    {
        if(!node.otClickOutside)
        {
            continue;
        }

        if(!node.contains(event.target) && node !== event.target)
        {
            node.otClickOutside(event);
        }
    }
});
