<svelte:options immutable={true}/>

<script lang="ts">
    import Button from '../Button.svelte';
    import {createEventDispatcher, afterUpdate} from 'svelte';
    import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';
    import {scale, crossfade} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import type {Todo} from "$lib/todos/todo.model";

    afterUpdate(() => {
        if (scrollOnAdd) {
            let pos;
            if (scrollOnAdd === 'top') pos = 0;
            if (scrollOnAdd === 'bottom') pos = listDivScrollHeight;

            if (autoscroll) listDiv.scrollTo(0, pos);
            autoscroll = false;
        }
    });

    const [send, receive] = crossfade({
        duration: (d) => Math.sqrt(d * 200),
        fallback(node) {
            return scale(node, {
                duration: 250,
                easing: (t) => t * (2 - t),
            });
        },
    });

    export let todos: Todo[] | null = null;
    export let error: string | null = null;
    export let isLoading = false;
    export let disableAdding = false;
    export let disabledItems: string[] = [];
    export let scrollOnAdd: any = undefined;

    let prevTodos = todos;
    let inputText = '';
    let input: any, listDiv: any, autoscroll: any, listDivScrollHeight: any;

    const dispatch = createEventDispatcher();

    $: done = todos?.filter((todo) => todo.completed) ?? [];
    $: todo = todos?.filter((todo) => !todo.completed) ?? [];

    $: {
        autoscroll = todos && prevTodos && todos.length > prevTodos.length;
        prevTodos = todos;
    }

    export function clearInput() {
        inputText = '';
    }

    export function focusInput() {
        input.focus();
    }

    function handleAddTodo() {
        const isNotCancelled = dispatch(
            'addtodo',
            {
                title: inputText
            },
            {
                cancelable: true
            }
        );
        if (isNotCancelled) {
            inputText = '';
        }
    }

    function handleRemoveTodo(id: string) {
        dispatch('removetodo', {
            id
        });
    }

    function handleToggleTodo(id: string, value: any) {
        dispatch('toggletodo', {
            id,
            value
        });
    }
</script>

<div class="todo-list-wrapper" >
    {#if isLoading}
        <p class="state-text">Loading...</p>
    {:else if error}
        <p class="state-text">{error}</p>
    {:else if todos}
        <div class="todo-list" bind:this={listDiv}>
            <div bind:offsetHeight={listDivScrollHeight}>
                {#if todos.length === 0}
                    <p class="state-text">No todos yet</p>
                {:else}
                    <div style="display:flex">
                        {#each [todo, done] as list, index}
                            <div class="list-wrapper">
                                <h2>{index === 0 ? "Todo" : "Done"}</h2>
                                <ul>
                                    {#each list as todo, index (todo.id)}
                                        {@const {id, completed, title} = todo}
                                        <li animate:flip={{ duration: 300 }}>
                                            <slot {todo} {index} {handleToggleTodo}>
                                                <div in:receive|local={{ key: id }} out:send|local={{ key: id }}
                                                     class:completed>
                                                    <label>
                                                        <input
                                                                disabled={disabledItems.includes(id)}
                                                                on:input={(event) => {
                          event.currentTarget.checked = completed;
                          handleToggleTodo(id, !completed);
                        }}
                                                                type="checkbox"
                                                                checked={completed}
                                                        />
                                                        <slot name="title">{title}</slot>
                                                    </label>
                                                    <button
                                                            disabled={disabledItems.includes(id)}
                                                            class="remove-todo-button"
                                                            aria-label="Remove todo: {title}"
                                                            on:click={() => handleRemoveTodo(id)}
                                                    >
                      <span style:width="10px" style:display="inline-block">
                        <FaRegTrashAlt/>
                      </span>
                                                    </button>
                                                </div>
                                            </slot>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/each}

                    </div>
                {/if}
            </div>
        </div>
    {/if}
    <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
        <input
                disabled={disableAdding || !todos}
                bind:this={input}
                bind:value={inputText}
                placeholder="New Todo"
        />
        <Button class="add-todo-button" type="submit" disabled={!inputText || disableAdding || !todos}
        >Add
        </Button
        >
    </form>
</div>

<style lang="scss">
  .todo-list-wrapper {
    background-color: #424242;
    border-radius: 6px;
    border: 1px solid #4b4b4b;

    .state-text {
      margin: 0;
      padding: 15px;
      text-align: center;
    }

    .todo-list {
      max-height: 400px;
      overflow-y: scroll;

      .list-wrapper {
        padding: 10px;
        flex: 1;

        h2 {
          margin: 0;
          padding: 0 10px;
          font-size: 18px;
          color: #fff;
        }
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li > div {
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          background-color: #303030;
          border-radius: 5px;
          padding: 10px;
          position: relative;

          label {
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: baseline;
            padding-right: 20px;
            color: #fff;

            input[type='checkbox'] {
              margin: 0 10px 0 0;
              cursor: pointer;
            }
          }

          &.completed > label {
            opacity: 0.5;
            text-decoration: line-through;
          }

          .remove-todo-button {
            border: none;
            background: none;
            padding: 5px;
            position: absolute;
            right: 10px;
            cursor: pointer;
            display: none;

            &:disabled {
              opacity: 0.4;
              cursor: not-allowed;
            }

            :global(svg) {
              fill: #bd1414;
            }
          }

          &:hover {
            .remove-todo-button {
              display: block;
            }
          }
        }
      }
    }

    .add-todo-form {
      padding: 15px;
      background-color: #303030;
      display: flex;
      flex-wrap: wrap;
      border-top: 1px solid #4b4b4b;

      input {
        flex: 1;
        background-color: #424242;
        border: 1px solid #4b4b4b;
        padding: 10px;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }

</style>
