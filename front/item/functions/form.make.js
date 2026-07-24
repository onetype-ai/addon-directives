// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.form.make', function(config, compile, node, submit)
{
    this.element = () =>
    {
        config.form = document.createElement('form');
        config.form.setAttribute('autocomplete', 'off');

        while(node.firstChild)
        {
            config.form.appendChild(node.firstChild);
        }

        node.appendChild(config.form);

        if(Object.keys(config.data).length)
        {
            Object.assign(compile.data, config.data);
            requestAnimationFrame(() => onetype.form.set(config.form, config.data));
        }
    };

    this.handler = () =>
    {
        config.form.otForm = async (event) =>
        {
            event.preventDefault();

            if(config.stop)
            {
                event.stopPropagation();
            }

            const closest = event.target.closest('form');

            await submit(closest ? closest : event.target);
        };
    };

    this.element();
    this.handler();
});
