// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import directives from '#directives/back/addon.js';

directives.Fn('assert.canon', function(context)
{
    const violations = [];

    this.report = (line, message) =>
    {
        violations.push({
            rule: 'directive',
            file: context.file,
            line: line,
            message: message
        });
    };

    this.field = (name) =>
    {
        const property = context.fields.find((entry) => name === (entry.key.name ? entry.key.name : entry.key.value));

        return property ? property.value : null;
    };

    this.spelled = (identifier, order) =>
    {
        return order.value + '.' + String(identifier.value).replace(/-/g, '.') + '.js';
    };

    this.filename = () =>
    {
        const identifier = this.field('id');
        const order = this.field('order');

        if(!identifier || identifier.type !== 'Literal' || !order || order.type !== 'Literal')
        {
            return;
        }

        const lawful = this.spelled(identifier, order);

        if(context.file.split('/').pop() !== lawful)
        {
            const actual = context.file.split('/').pop();

            const message = 'The file is named ' + actual + ' but the directive reads ' + lawful + ', the name is the order and the id with dots.';

            this.report(identifier.loc.start.line, message);
        }
    };

    this.wrong = (code) =>
    {
        const names = code.params.map((param) => param.name);

        if(names.join(',') !== 'data,compile,node')
        {
            this.report(code.loc.start.line, 'The code signature reads (' + names.join(', ') + ') but the canon orders (data, compile, node).');
        }
    };

    this.signature = () =>
    {
        const code = this.field('code');

        if(!code || !['FunctionExpression', 'ArrowFunctionExpression'].includes(code.type))
        {
            return null;
        }

        this.wrong(code);

        return code;
    };

    this.branch = (value, visit) =>
    {
        if(Array.isArray(value))
        {
            return value.forEach((child) => this.walk(child, visit));
        }

        if(value && typeof value === 'object')
        {
            this.walk(value, visit);
        }
    };

    this.walk = (node, visit) =>
    {
        if(!node || typeof node.type !== 'string')
        {
            return;
        }

        visit(node);

        Object.values(node).forEach((value) => this.branch(value, visit));
    };

    this.listeners = () =>
    {
        this.walk(context.tree, (node) =>
        {
            if(node.type !== 'CallExpression' || node.callee.type !== 'MemberExpression')
            {
                return;
            }

            if(node.callee.object.name !== 'document' || node.callee.property.name !== 'addEventListener')
            {
                return;
            }

            this.report(node.loc.start.line, 'No document.addEventListener in a directive, the addon listens through onetype.document emitters.');
        });
    };

    this.reads = (code) =>
    {
        const attributes = this.field('attributes');
        const declared = attributes && attributes.type === 'ObjectExpression'
            ? attributes.properties.map((entry) => entry.key.name ? entry.key.name : entry.key.value)
            : [];

        this.walk(code, (node) =>
        {
            if(node.type !== 'MemberExpression' || !node.computed || node.object.name !== 'data')
            {
                return;
            }

            if(node.property.type !== 'Literal' || declared.includes(node.property.value))
            {
                return;
            }

            this.report(node.loc.start.line, 'The code reads data[' + JSON.stringify(node.property.value) + '] but the directive declares no such attribute.');
        });
    };

    this.filename();
    this.listeners();

    const code = this.signature();

    if(code)
    {
        this.reads(code);
    }

    return violations;
});
