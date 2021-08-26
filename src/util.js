//canvas 渐变
export function createGradient(ctx,start,end,startColor,endColor){
  var gradient=ctx.createLinearGradient(start.x,start.y,end.x,end.y);
  gradient.addColorStop(0,startColor);                  //定义渐变色颜色
  gradient.addColorStop(1,endColor);
  return gradient;
}
