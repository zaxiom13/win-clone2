// @ts-nocheck
// a main place to store all windows possible, all currently open windows and their state
// using svelte stores

import { writable } from 'svelte/store'
import About from './lib/apps/About.svelte'
import Settings from './lib/apps/Settings.svelte'
import Help from './lib/apps/Help.svelte'
import Calculator from './lib/apps/Calculator.svelte'
import Todo from './lib/apps/Todo.svelte'
import Timer from './lib/apps/Timer.svelte'
import Notes from './lib/apps/Notes.svelte'

// gid is a global id, it is incremented every time a new window is opened
let gid = 0

// this is the list of all possible windows
// each window has a name, a component, and a list of props
// the props are passed to the component when the window is opened

// the list of all possible apps
export const apps = [
    {
        name: 'about',
        component: About,
        props: {},
    },
    {
        name: 'settings',
        component: Settings,
        props: {},
    },
    {
        name: 'help',
        component: Help,
        props: {},
    },
    {
        name: 'calculator',
        component: Calculator,
        props: {},
    },
    {
        name: 'todo',
        component: Todo,
        props: {},
    },
    {
        name: 'timer',
        component: Timer,
        props: {},
    },
    {
        name: 'notes',
        component: Notes,
        props: {},
    },
]


// now we need to store the currently open windows
// this is a list of objects, each object has an app an id which is gid++

// the id is used to uniquely identify the window

// the list of currently open windows
export const openWindows = writable([])

openWindows.update(windows => {
    // add the window to the list of open windows
    windows.push({
        id: gid++,
        app: apps.find(app => app.name === 'about'),
    })
    return windows
})



// open a window
export function open(appName) {
    // add the window to the list of open windows
    openWindows.update(windows => {
        // add the window to the list of open windows
        windows.push({
            id: gid++,
            app: apps.find(app => app.name === appName.toLowerCase()),
        })
        return windows
    })
}



// close a window
export function close(id) {
    // remove the window from the list of open windows
    openWindows.update(windows => {
        // remove the window from the list of open windows
        windows = windows.filter(window => window.id !== id)
        return windows
    })



}