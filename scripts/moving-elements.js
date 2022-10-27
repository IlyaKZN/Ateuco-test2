$(() => {
  const wrapperWidth = $(".cupboard_moving-elements-wrapper").width();
  const elementWidth = wrapperWidth / 6;
  $("#moving-element-1").css({
    "border-left": `${elementWidth}px solid transparent`,
    "border-right": `${elementWidth}px solid transparent`,
    "border-top": `${elementWidth * 2}px solid green`,
  });
  $("#moving-element-2").css({
    "border-style": "solid",
    "border-width": `${elementWidth}px ${elementWidth}px ${elementWidth}px ${elementWidth}px`,
    "border-color": "red red transparent red",
  });
  $("#moving-element-3").css({
    width: `${elementWidth * 2}px`,
    height: `${elementWidth * 2}px`,
    "background-color": "blue",
  });

  $(".cupboard_moving-element").each((el, value) => {
    movementAnimation(true, value.id, 3500 - Math.random() * 1000);
  })

  function movementAnimation(direction, elementId, animationDuration) {
    const containerHeight = $(`#${elementId}`)
      .parent()
      .parent()
      .height();
    let movementDistance = containerHeight - elementWidth * 2 + "px";
    if (!direction) {
      movementDistance = "0";
    }
    $(`#${elementId}`)
      .parent()
      .animate({ top: movementDistance }, animationDuration, false, () =>
        movementAnimation(!direction, elementId, animationDuration)
      );
  }
});
