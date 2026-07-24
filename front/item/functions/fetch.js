// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.fetch', function(data, compile, node)
{
    const config = directives.Fn('item.fetch.make', data, compile, node);

    config.html = node.innerHTML;

    this.state = () =>
    {
        compile.data[config.bind] = {
            response: null,
            error: null,
            loading: true,
            success: false,
            fetched: true
        };

        node.innerHTML = '';
        compile.children = false;
    };

    this.response = (response) =>
    {
        if(!response.ok)
        {
            throw onetype.Error(response.status, 'HTTP :status:.', { status: response.status });
        }

        return response.json();
    };

    this.callback = (source, argument) =>
    {
        if(!source)
        {
            return;
        }

        const callback = onetype.Function(source, compile.data, false);

        if(typeof callback === 'function')
        {
            callback(argument);
        }
    };

    this.success = (result) =>
    {
        const state = compile.data[config.bind];

        state.response = result.data === undefined ? result : result.data;
        state.error = null;
        state.loading = false;
        state.success = true;

        this.callback(config.onSuccess, state.response);
    };

    this.error = (failure) =>
    {
        const state = compile.data[config.bind];

        state.response = null;
        state.error = failure.message;
        state.loading = false;
        state.success = false;

        onetype.Error(500, 'Fetch error.', { bind: config.bind });

        this.callback(config.onError, failure.message);
    };

    this.complete = () =>
    {
        const compiled = compile.render.Compile(config.html, compile.data);
        const fragment = document.createDocumentFragment();

        while(compiled.element.firstChild)
        {
            fragment.appendChild(compiled.element.firstChild);
        }

        node.replaceWith(fragment);
        compile.render.Update();
    };

    if(compile.data[config.bind] && compile.data[config.bind].fetched)
    {
        return;
    }

    this.state();

    fetch(config.url)
        .then((response) => this.response(response))
        .then((result) => this.success(result))
        .catch((failure) => this.error(failure))
        .finally(() => this.complete());
});
