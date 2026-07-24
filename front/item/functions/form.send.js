// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.form.send', async function(config, submitData)
{
    const url = config.endpoint.startsWith('/') ? config.endpoint : '/' + config.endpoint;

    const response = await fetch(url, {
        method: config.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
    });

    const result = await response.json();

    return { response, result };
});
