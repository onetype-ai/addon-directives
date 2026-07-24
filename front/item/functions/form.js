// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.form', function(config, compile, node)
{
    this.state = () =>
    {
        if(compile.data[config.bind])
        {
            return;
        }

        compile.data[config.bind] = {
            data: null,
            message: null,
            code: null,
            loading: false
        };
    };

    this.local = async (form, submitData) =>
    {
        const state = compile.data[config.bind];

        state.data = submitData;

        if(config.onSuccess)
        {
            await config.onSuccess(submitData);
        }

        if(config.reset)
        {
            form.reset();
        }

        compile.render.Update();
    };

    this.blocked = async (submitData) =>
    {
        if(!config.onSubmit)
        {
            return false;
        }

        return await config.onSubmit(submitData) === false;
    };

    this.submit = async (form) =>
    {
        const state = compile.data[config.bind];

        if(state.loading)
        {
            return;
        }

        const submitData = Object.assign({}, config.data, onetype.form.get(form));

        if(await this.blocked(submitData))
        {
            return compile.render.Update();
        }

        if(!config.endpoint)
        {
            return this.local(form, submitData);
        }

        await this.send(form, state, submitData);
    };

    this.landed = (form, state) =>
    {
        if(config.reset)
        {
            form.reset();
        }

        if(config.redirect)
        {
            return onetype.AddonGet('pages')?.Fn('do.change', null, config.redirect);
        }

        if(config.onSuccess)
        {
            config.onSuccess(state);
        }
    };

    this.keep = (state, result, response) =>
    {
        state.data = result.data ? result.data : null;
        state.message = result.message ? result.message : null;
        state.code = result.code ? result.code : response.status;
        state.loading = false;
    };

    this.failed = (state, error) =>
    {
        state.data = null;
        state.message = error.message;
        state.code = 0;
        state.loading = false;

        if(config.onError)
        {
            config.onError(state);
        }
    };

    this.open = (state) =>
    {
        state.loading = true;
        state.message = null;
        state.code = null;

        compile.render.Update();
    };

    this.send = async (form, state, submitData) =>
    {
        this.open(state);

        try
        {
            const { response, result } = await directives.Fn('item.form.send', config, submitData);

            this.keep(state, result, response);
            this.answer(form, state, response);
        }
        catch(error)
        {
            this.failed(state, error);
        }

        compile.render.Update();
    };

    this.answer = (form, state, response) =>
    {
        if(response.ok)
        {
            return this.landed(form, state);
        }

        if(config.onError)
        {
            config.onError(state);
        }
    };

    this.state();

    directives.Fn('item.form.make', config, compile, node, (form) => this.submit(form));
});
