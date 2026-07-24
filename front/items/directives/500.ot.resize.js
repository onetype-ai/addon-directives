// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-resize',
        icon: 'drag_handle',
        name: 'Resize',
        description: 'Drag an edge of the node to resize it, onResizing rides the drag and onResize lands once on release.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-resize': {
                type: 'object',
                description: 'The resize configuration of the node.',
                config: {
                    edge: {
                        type: 'array|string',
                        required: true,
                        each: {
                            type: 'string',
                            options: ['left', 'right', 'top', 'bottom'],
                            description: 'One edge that drags.'
                        },
                        description: 'The edges that drag, one or a list.'
                    },
                    min: {
                        type: 'number',
                        value: 0,
                        description: 'The smallest size in pixels.'
                    },
                    max: {
                        type: 'number',
                        value: Infinity,
                        description: 'The largest size in pixels.'
                    },
                    width: {
                        type: 'number',
                        description: 'Starting width in pixels, left out to keep the natural one.'
                    },
                    height: {
                        type: 'number',
                        description: 'Starting height in pixels, left out to keep the natural one.'
                    },
                    onResizing: {
                        type: 'function',
                        description: 'Runs live while an edge drags.'
                    },
                    onResize: {
                        type: 'function',
                        description: 'Runs once when the drag releases.'
                    }
                }
            }
        },
        code: function(data, compile, node)
        {
            const config = data['ot-resize'].value;

            config.edge = Array.isArray(config.edge) ? config.edge : [config.edge];

            node.otResizeConfig = config;

            if(config.width)
            {
                node.style.width = config.width + 'px';
            }

            if(config.height)
            {
                node.style.height = config.height + 'px';
            }
        }
    });
});
