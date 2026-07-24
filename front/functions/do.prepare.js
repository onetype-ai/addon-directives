// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('do.prepare', function()
{
    if(directives.StoreHas('sorted'))
    {
        return;
    }

    const sorted = Object.values(directives.Items()).sort((one, two) => one.Get('order') - two.Get('order'));

    directives.StoreSet('sorted', sorted.map((directive) =>
    {
        return {
            item: directive,
            trigger: directive.Get('trigger'),
            type: directive.Get('type'),
            tag: directive.Get('tag'),
            attributes: directive.Get('attributes'),
            strict: directive.Get('strict'),
            code: directive.Get('code')
        };
    }));

    directives.StoreSet('fn.match', directives.FnGet('is.match').callback);
    directives.StoreSet('fn.data', directives.FnGet('get.attributes').callback);
    directives.StoreSet('fn.attributes', directives.FnGet('do.bind').callback);
});
