<?php

use starfederation\datastar\events\ExecuteScript;

test('Event is correctly output', function() {
    $content = 'console.log("Hello, world!")';
    $event = new ExecuteScript($content, [
        'autoRemove' => false,
        'attributes' => ['type module', 'defer'],
    ]);
    expect($event->getDataLines())
        ->toBe([
            'data: autoRemove false',
            'data: attributes defer',
            'data: script ' . $content,
        ]);
});

test('Default options are not output', function() {
    $content = 'console.log("Hello, world!")';
    $event = new ExecuteScript($content, [
        'autoRemove' => true,
        'attributes' => ['type module'],
    ]);
    expect($event->getDataLines())
        ->toBe([
            'data: script ' . $content,
        ]);
});
