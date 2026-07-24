# Directives

Directives are the template language of the front. Markup stays pure html, and every piece of behavior binds through an attribute: `ot-if` decides presence, `ot-for` multiplies, `ot-click` listens, `:class` computes, `{{ name }}` prints. The engine walks every rendered node, runs the matching directives in order, and consumes their attributes, so the living DOM stays clean.

- Package: `@onetype/addon-directives`, slug `onetype/addon/directives`
- Depends on: nothing
- Sides: `front/` engine and vocabulary, `back/` bare declaration

## Expressions

Every directive value is an expression evaluated against the data of the render, the element state in an element, the loop row inside `ot-for`. Plain reads, calls, comparisons and arithmetic all work: `count + 1`, `active === row.id`, `submit()`, `'card ' + tone`.

Three binding forms share the grammar:

| Form | Where | Meaning |
| --- | --- | --- |
| `{{ expression }}` | text | Prints the value into the text node. |
| `:name="expression"` | any attribute | Sets the attribute from the value. `undefined`, `null` and `false` omit it, `true` writes the bare name. `:class` adds its classes to the static ones instead of replacing them. |
| `ot-*="expression"` | directive attributes | Feeds the directive. |

## Flow

```html
<p ot-if="error">{{ error }}</p>

<li ot-for="row in rows">{{ row.name }}</li>
<li ot-for="row, place in rows">{{ place }}. {{ row.name }}</li>

<div ot-show="open">Kept in the DOM, hidden by display.</div>
```

- `ot-if` removes the node when the condition falls. It runs after `ot-for`, so the two ride the same element cleanly: `<p ot-for="row in rows" ot-if="row.visible">`.
- `ot-for` reads `row in rows`, with an optional index as `row, place in rows`. Rows key themselves by `row.id` when the value carries one; write `ot-key` yourself only when there is no id. The loop goes ON the repeated element, never on its parent.
- `ot-show` toggles visibility without touching the tree.

## Events

```html
<button ot-click="save()">Save</button>
<input ot-input="search" ot-keydown.prevent="jump">
<div ot-click-outside="close()"></div>
```

`ot-mousedown`, `ot-click`, `ot-double-click`, `ot-mouse-move`, `ot-scroll`, `ot-submit`, `ot-input`, `ot-change`, `ot-focus`, `ot-blur`, `ot-keydown`, `ot-keyup`, `ot-paste`, `ot-mouse-enter`, `ot-mouse-leave`, `ot-click-outside`, plus the drag family `ot-dragstart`, `ot-dragover`, `ot-dragenter`, `ot-dragleave`, `ot-drop`, `ot-dragend`.

The expression resolves to a handler function which receives `{ event }`, value events add `value`. Modifiers ride the attribute name: `.prevent` calls preventDefault, `.stop` stops propagation. The handler is always a function living on the state, an inline assignment like `open = !open` does nothing, state changes belong to the render: `this.toggle = () => { this.open = !this.open; };` then `ot-click="toggle()"`.

## Content

```html
<div ot-html="article.body"></div>
<div ot-node="chart.Element"></div>
<slot name="footer"></slot>
```

- `ot-html` fills the node with markup born from the expression, compiled through the engine.
- `ot-node` mounts a real DOM node.
- `slot` inserts named slot content given by the parent.
- `ot-text` is the moustache engine itself, it fills every `{{ }}` in text.

## Data

```html
<ot-fetch get="api/posts" bind="posts">
    <div ot-if="posts.loading">Loading</div>
    <article ot-for="post in posts.response">{{ post.title }}</article>
</ot-fetch>

<ot-form post="api/register" bind="register" :_success="done">
    <input name="email">
    <button>Go</button>
</ot-form>
```

- `<ot-fetch>` calls the url and binds `{ response, error, loading, success }` under the `bind` key, then compiles its content.
- `<ot-form>` wraps its content in a real form, submits as json, and binds `{ data, message, code, loading }`. `_submit` runs before the call and may cancel with `false`, `_success` and `_error` run after, `reset` clears the form, `redirect` visits a path.

## Motion

```html
<div class="grid" :ot-flip="420">
    <div class="card" ot-for="card in cards">{{ card.label }}</div>
</div>
```

`ot-flip` on a container animates its children across re-renders: a reorder travels, a newcomer scales in, a filter slides the survivors into place. The value is the duration in milliseconds, left out it rides at 320. No library, no keyframes, one attribute.

```html
<li ot-for="task in tasks" ot-sort="tasks">{{ task.title }}</li>
```

`ot-sort` rides the repeated node and names the array it was born from: dragging the node reorders that array live while the pointer moves, the rows around it travel through `ot-flip` on the container, and the data is already in its final order when the drag ends. The dragged node carries the class `ot-sorting` for its ghost look.

```html
<li ot-for="task in tasks" ot-sort="tasks" ot-sorted="save">{{ task.title }}</li>
```

`ot-sorted` names the handler that runs once when a drag lands in a genuinely new order, receiving `{ list, key }`, the reordered array and the id of the dragged row. That is the moment to persist: `this.save = (got) => { commands.run('tasks:reorder', { order: got.list.map((row) => row.id) }); };`

## Mechanics

- `ot-resize` makes a node resizable by its edges, with `onResizing` live and `onResize` on release.
- `ot-base` prefixes rooted links with the base path of the app.
- `render` mounts a render instance from the parent context by name.

## Author a directive

A directive is one item of the directives addon, one file in `front/items/directives/`, named by its run order and its id with dots: directive `ot-glow` at order 500 lives in `500.ot.glow.js`. The file wraps exactly one registration:

```js
onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-glow',
        icon: 'flare',
        name: 'Glow',
        description: 'Lights the node up while its condition holds.',
        trigger: 'node',
        order: 500,
        attributes: {
            'ot-glow': {
                type: 'string',
                description: 'The condition of the glow.'
            }
        },
        code: function(data, compile, node)
        {
            if(onetype.Function(data['ot-glow'].value, compile.data, false))
            {
                node.classList.add('glow');
            }
        }
    });
});
```

The laws of a directive:

- The fields are exactly `id`, `icon`, `name`, `description`, `trigger`, `order`, `strict`, `tag`, `type`, `attributes`, `code`, in that order; there is no other field and an unknown field throws at registration.
- `code` always reads `(data, compile, node)`. `data` holds only the declared attributes, each as `{ value, modifiers, original }`, already typed and consumed. `compile.data` is the state of the render, `compile.render` the render instance, `compile.identifier` the node identifier.
- The code may only read attributes it declared, `data['ot-x']` with an undeclared name is a violation.
- Never `document.addEventListener` inside a directive. The framework fires `onetype.document.<event>` for every DOM event; the directive sets a handler property on the node in `code`, and a listener file in `front/listeners/emitters/onetype.document.<event>.js` catches the emitter and walks to the owner, like the built in event directives do.
- Long machinery does not live in the item, it lives as an `item.*` function of the addon in `front/item/functions/`, and the item calls `directives.Fn('item.name', ...)`.
- Timers and observers a directive starts must die with the node, tie them to the removal of the node, never leak. A node-level `node.addEventListener` is fine, it dies with the node.
- A directive that owns the content of its node marks it `ot-skip`, the patch then leaves the whole node alone across re-renders.
- A static attribute is always a string; a typed value binds through the `:` form, `:ot-clock="3"` arrives as a number.

## Order

Directives run per node, sorted ascending: `ot-for` 90 expands first, `ot-if` 100 decides, `ot-show` 110, slots 160, `ot-flip` 300, `ot-sort` 400, events 500, fetch 650, form 660, text and html 700 and 750, render 1000, base 2000. A directive that removes its node stops the chain.

## Guarantees

- Declared attributes are typed: every directive attribute passes the schema of its define, wrong shapes report loudly and fall to null.
- Attributes are consumed: after the walk no `ot-*` or `:` attribute remains in the DOM.
- Errors never break the walk: a directive that throws reports `<tag> directive "name" — reason` and the render carries on.
