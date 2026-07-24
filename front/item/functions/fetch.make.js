// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.fetch.make', function(data, compile, node)
{
    const config = {};

    this.endpoint = () =>
    {
        if(data['get'].value)
        {
            return data['get'].value;
        }

        return data['endpoint'].value ? data['endpoint'].value : data['url'].value;
    };

    this.evaluate = (raw) =>
    {
        const evaluated = onetype.Function(raw, compile.data, false);

        return evaluated ? evaluated : {};
    };

    this.params = () =>
    {
        const raw = data['params'].value;

        if(!raw)
        {
            return {};
        }

        try
        {
            return JSON.parse(raw);
        }
        catch(error)
        {
            void error;

            return this.evaluate(raw);
        }
    };

    this.url = () =>
    {
        let url = config.endpoint;

        if(!/^https?:\/\//.test(url) && !url.startsWith('/'))
        {
            url = '/' + url;
        }

        const pairs = Object.entries(config.params).map(([name, value]) =>
        {
            return encodeURIComponent(name) + '=' + encodeURIComponent(value);
        });

        if(pairs.length)
        {
            url += (url.includes('?') ? '&' : '?') + pairs.join('&');
        }

        return url;
    };

    config.endpoint = this.endpoint();
    config.bind = data['bind'].value;
    config.onSuccess = data['on-success'].value;
    config.onError = data['on-error'].value;
    config.params = this.params();
    config.url = this.url();

    return config;
});
