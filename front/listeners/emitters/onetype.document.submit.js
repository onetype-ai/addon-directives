// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.document.submit', (event) =>
{
    directives.Fn('do.dispatch', event, 'otSubmit');

    if('otForm' in event.target)
    {
        event.target.otForm(event);
    }
});
