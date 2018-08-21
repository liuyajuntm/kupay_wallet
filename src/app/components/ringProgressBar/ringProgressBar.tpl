<div w-class="box" style="width: {{it.width}}px;height: {{it.width}}px;backgroundColor: {{it.bgColor}};">
    <div w-class="clip" style="width: {{it.width}}px;height: {{it.width}}px;border: {{it.borderWidth}}px solid {{it.bgColor}};clip:{{it.activePercent >= 0.5 ? 'auto' : 'rect(0, ' + it.width + 'px,' + it.width + 'px,' + it.width/2 + 'px)'}} ;">
        <div w-class="left" style="width: {{it.width}}px;height: {{it.width}}px;border: {{it.borderWidth}}px solid {{it.activeColor}};clip: rect(0, {{it.width/2}}px, {{it.width}}px, 0);top:{{-it.borderWidth}}px;left:{{-it.borderWidth}}px;transform:rotate({{Math.floor(it.activePercent * 360)}}deg);"></div>
        <div w-class="right" style="width: {{it.activePercent >= 0.5 ? it.width : 0}}px;height: {{it.width}}px;border: {{it.borderWidth}}px solid {{it.activeColor}};clip: rect(0, {{it.width}}px, {{it.width}}px, {{it.width/2}}px);top:{{-it.borderWidth}}px;left:{{-it.borderWidth}}px;"></div>
    </div>
    <div w-class="text" style="{{it.centerStyle}};width: {{it.width - it.borderWidth * 2}}px;height:{{it.width - it.borderWidth * 2}}px;">
        {{it.centerText}}
    </div>
</div>