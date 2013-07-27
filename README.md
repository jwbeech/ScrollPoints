ScrollPoints
============

Event triggers at certain scroll points, with directionality.

Possible Options:
{
    // The vertical position of the element that you want the event to occur on.
    position : 100,

    // The scroll direction that you want the event on, possible values are "down", "up", "both" - default
    direction : "up",

    // The default action, possible values are "add" - default or "remove" - to remove a callback from a specific element
    action : "add"
}


Adding a callback:
$("#div1").scrollPoint({position:700}, function(){
    console.log("Hello there mr div 1");
});

Adding a down only event
$("#div1").scrollPoint({position:700, direction:"down"}, function(){
    console.log("Scroll down event for mr div 1");
});

To remove a callback
$("#div1").scrollPoint({action:"remove"});